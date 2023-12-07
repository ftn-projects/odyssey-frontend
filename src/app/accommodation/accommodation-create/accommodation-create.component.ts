import { Component, OnInit } from '@angular/core';
import { AccommodationType, PricingType } from '../accommodation.model';
import { Amenity, AmenityView } from '../amenity.model';
import { AccommodationService } from '../accommodation.service';
import { AvailabilitySlot } from '../model/availability-slot.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-accommodation-create',
    templateUrl: './accommodation-create.component.html',
    styleUrl: './accommodation-create.component.css'
})
export class AccommodationCreateComponent implements OnInit {
    onAddSlot() {
        throw new Error('Method not implemented.');
    }
    accommodationTypes = Object.keys(AccommodationType).filter((v) => isNaN(Number(v)));
    pricingTypes: string[][];
    confirmationType: string[] = ['Automatic', 'Manual'];
    amenities: AmenityView[] = [];
    slots: AvailabilitySlot[] = [];
    slotColumns: string[] = ['start', 'end', 'price'];

    dateRange = new FormGroup({
        start: new FormControl(),
        end: new FormControl()
    });

    constructor(protected service: AccommodationService) {
        let keys = Object.keys(PricingType).filter((v) => isNaN(Number(v)));
        this.pricingTypes = [
            [PricingType.PerPerson, keys[0]],
            [PricingType.PerAccommodation, keys[1]],
        ]
    }

    ngOnInit(): void {
        this.amenities = [
            { id: 1, title: 'TV', icon: 'tv', selected: true },
            { id: 1, title: 'WiFi', icon: 'wifi', selected: true },
            { id: 1, title: 'Kitchen', icon: 'local_dining', selected: false },
            { id: 1, title: 'Free parking', icon: 'local_parking', selected: true },
            { id: 1, title: 'Beach access', icon: 'beach_access', selected: false },
            { id: 1, title: 'Washer', icon: 'local_laundry_service', selected: false },
            { id: 1, title: 'Spa', icon: 'spa', selected: false },
            { id: 1, title: 'Air conditioning', icon: 'ac_unit', selected: false },
            { id: 1, title: 'King bed', icon: 'king_bed', selected: false },
            { id: 1, title: 'Smoking room', icon: 'smoking_rooms', selected: false },
        ];
        // this.service.getAmenities().subscribe({
        //     next: (amenities) => this.amenities = amenities,
        //     error: (err) => console.log(err)
        // });

    }

    onCreate() {

    }

};
