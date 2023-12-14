import { Component, OnInit } from '@angular/core';
import { AmenityView } from '../amenity.model';
import { AccommodationService } from '../accommodation.service';
import { AvailabilitySlot } from '../model/availability-slot.model';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from '../../shared/shared.service';
import { isOverlap } from '../../shared/model/time-slot.model';
import { MatTableDataSource } from '@angular/material/table';
import { Accommodation } from '../model/accommodation.model';
import { Amenity } from '../model/amenity.model';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { Router } from '@angular/router';
import { AccommodationCreation } from '../model/accommodation-creation.model';


@Component({
    selector: 'app-accommodation-create',
    templateUrl: './accommodation-create.component.html',
    styleUrl: './accommodation-create.component.css'
})
export class AccommodationCreateComponent implements OnInit {
    selectedConfirmation: string = 'MANUAL';
    amenities: AmenityView[] = [];

    slotColumns: string[] = ['start', 'end', 'price', 'delete'];
    slots: AvailabilitySlot[] = [];
    slotsData = new MatTableDataSource<AvailabilitySlot>();

    dateRange = new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null)
    });
    price: number = 0;

    accommodation: AccommodationCreation = {
        id: -1,
        title: '',
        description: '',
        type: 'APARTMENT', // Assuming type is an enum
        address: { street: 'Bulevar oslobodjenja', number: 55, city: 'Novi Sad', country: 'Serbia' },
        pricing: 'PER_PERSON',
        amenities: new Set<Amenity>(),
        host: -1,
        defaultPrice: 0,
        automaticApproval: false,
        cancellationDue: "PT0.000000563S",
        availableSlots: new Set<AvailabilitySlot>(),
        minGuests: 1,
        maxGuests: 1,
        totalPrice: 0,
        averageRating: 0
    }

    constructor(
        protected accommodationService: AccommodationService,
        private sharedService: SharedService,
        private authService: AuthService,
        private router: Router) {
    }

    ngOnInit(): void {
        const icons = this.accommodationService.amenityIcons;
        this.accommodationService.getAmenities().subscribe({
            next: (amenities) => {
                this.amenities = amenities.map(a => ({
                    icon: icons.get(a.title || 'DEFAULT') || icons.get('DEFAULT'),
                    selected: false,
                    title: a.title,
                    id: a.id,
                }));
            }
        });
        this.accommodation.host = this.authService.getId();

        this.accommodationService.getById(2).subscribe({
            next: (accommodation) => console.log(accommodation),
            error: (err) => console.log(err)
        })
    }

    onCreate() {
        this.accommodation.automaticApproval = this.selectedConfirmation == 'AUTOMATIC';
        this.accommodation.availableSlots = new Set<AvailabilitySlot>(this.slots);
        this.accommodation.amenities = new Set<Amenity>(
            this.amenities.filter(a => a.selected).map(a => ({ id: a.id!, title: a.title! }))
        );

        console.log(this.accommodation);

        this.accommodationService.create(this.accommodation).subscribe({
            next: () => {
                confirm('Accommodation has been successfully created.');
                this.router.navigate(['']);
            },
            error: (err) => console.log(err)
        });
    }

    onAddSlot() {
        let start = this.dateRange.get('start')?.value;
        let end = this.dateRange.get('end')?.value;
        if (!start) {
            this.sharedService.displayError('Please select starting date of the slot.');
            return;
        }
        if (!end) {
            this.sharedService.displayError('Please select ending date of the slot.');
            return;
        }

        let slot = { start: start!, end: end!, price: this.price }
        if (slot.price < 0) {
            this.sharedService.displayError('Price cannot be negative.');
            return;
        }
        if (slot.end < slot.start) {
            this.sharedService.displayError('End is before start.');
            return;
        }
        if (this.slots.find(s => (isOverlap(s, slot)))) {
            this.sharedService.displayError('Slot overlaps with existing.');
            return;
        }
        this.slots.push(slot);
        this.refreshTable();

        this.dateRange.get('start')?.setValue(null);
        this.dateRange.get('end')?.setValue(null);
        this.price = 0;
    }

    removeSlot(i: number) {
        let temp = [];
        for (let [j, s] of this.slots.entries()) if (j != i) temp.push(s);

        this.slots = temp;
        this.refreshTable();
    }

    refreshTable() {
        this.slotsData.data = this.slots;
    }

    onResetSlots() { this.slots = []; }
};