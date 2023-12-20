import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AmenityView } from '../amenity.model';
import { AccommodationService } from '../accommodation.service';
import { AvailabilitySlot } from '../model/availability-slot.model';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from '../../shared/shared.service';
import { overlapping } from '../../shared/model/time-slot.model';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { Router } from '@angular/router';
import { AccommodationRequestCreation } from '../model/accommodation-request-create.model';
import { environment } from '../../../env/env';
import { FileService } from '../../shared/file.service';
import { forkJoin } from 'rxjs';
import { Image } from '../../shared/image-uploader/image.model';


@Component({
    selector: 'app-accommodation-create',
    templateUrl: './accommodation-create.component.html',
    styleUrl: './accommodation-create.component.css'
})
export class AccommodationCreateComponent implements OnInit {
    editing: boolean = false;
    accommodation: AccommodationRequestCreation = {
        id: -1,
        newTitle: '',
        newDescription: '',
        newType: 'APARTMENT', // Assuming type is an enum
        newAddress: { street: 'Bulevar oslobodjenja', number: 55, city: 'Novi Sad', country: 'Serbia' },
        newPricing: 'PER_PERSON',
        newDefaultPrice: 0,
        newAutomaticApproval: false,
        newCancellationDue: '',
        newAvailableSlots: [],
        newAmenities: [],
        newMinGuests: 1,
        newMaxGuests: 1,
        hostId: -1,
    }

    selectedConfirmation: string = 'MANUAL';
    amenities: AmenityView[] = [];

    slotColumns: string[] = ['start', 'end', 'price', 'delete'];
    slots: AvailabilitySlot[] = [];
    slotsTableData = new MatTableDataSource<AvailabilitySlot>();

    price: number = 0;
    dateRange = new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null)
    });

    constructor(
        protected accommodationService: AccommodationService,
        private sharedService: SharedService,
        private authService: AuthService,
        private service: FileService,
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
        this.accommodation.hostId = this.authService.getId();
    }

    async onSubmit() {
        this.accommodation.newAutomaticApproval = this.selectedConfirmation == 'AUTOMATIC';
        this.accommodation.newAvailableSlots = this.slots;
        this.accommodation.newAmenities = this.amenities.filter(a => a.selected).map(a => ({ id: a.id!, title: a.title! }));

        this.accommodationService.create(this.accommodation).subscribe({
            next: (model) => {
                this.uploadSelectedImages(model.id).subscribe({
                    next: () => {
                        console.log('Uploaded images.');
                        console.log('model', model);
                        confirm('Accommodation has been successfully created.');
                        this.router.navigate(['']);
                    },
                    error: (err) => {
                        console.log(err);

                        let errMessage = 'Could not upload the images!';
                        if (err.error && err.error.message)
                            errMessage = err.error.message;
                        this.sharedService.displayError(errMessage);
                    }
                });
            },
            error: (err) => console.log(err)
        });
    }

    onAddSlot() {
        console.log(this.images);

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

        let slot = { timeSlot: { start: start!, end: end! }, price: this.price }
        if (slot.price < 0) {
            this.sharedService.displayError('Price cannot be negative.');
            return;
        }
        if (slot.timeSlot.end < slot.timeSlot.start) {
            this.sharedService.displayError('End is before start.');
            return;
        }
        if (this.slots.find(s => (overlapping(s.timeSlot, slot.timeSlot)))) {
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
        for (let [j, s] of this.slots.entries())
            if (j != i) temp.push(s);

        this.slots = temp;
        this.refreshTable();
    }

    refreshTable = () => this.slotsTableData.data = this.slots;

    images: Image[] = [];

    selectImages(selectedImages: File[]) {
        console.log(selectedImages);

        selectedImages.forEach(image => {
            var reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = (event) => {
                if (event && event.target && typeof event.target.result === 'string')
                    this.images.push({ file: image, url: event.target.result });
            };
        });
    }

    uploadSelectedImages(id: number) {
        let endpoint = `${environment.apiHost}accommodationRequests/image/${id}`;
        return forkJoin(this.images.map(
            image => this.service.upload(image.file, endpoint, 'image'))
        );
    }

    trackImage = (index: number, image: Image) => image ? image.url : index;
    removeImage = (index: number) => this.images.splice(index, 1);
};