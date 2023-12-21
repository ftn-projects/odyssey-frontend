import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccommodationService } from '../../accommodation.service';
import { Amenity } from '../../model/amenity.model';

@Component({
    selector: 'app-filter-dialog',
    templateUrl: './filter-dialog.component.html',
    styleUrl: './filter-dialog.component.css'
})
export class FilterDialogComponent implements OnInit {
    constructor(
        private elRef: ElementRef,
        private dialogRef: MatDialogRef<FilterDialogComponent>,
        private fb: FormBuilder,
        private service: AccommodationService
    ) { }

    ngOnInit(): void {
        this.service.getAmenities().subscribe({
            next: (data: Amenity[]) => {
                this.amenities = data
                this.filterFormGroup = this.fb.group({
                    price: this.fb.group({
                        min: [0],
                        max: [2000],
                    }),
                    accommodationType: [''],
                    amenities: this.buildCheckboxes()
                });
            },
            error: (_) => { console.log("Greska!") }
        })
    }

    amenities: Amenity[] = [];

    filterFormGroup!: FormGroup;


    buildCheckboxes(): FormGroup {
        const group: any = {};
        this.amenities.forEach(amenity => {
            group[amenity.id!] = this.fb.control(false);
        });

        return this.fb.group(group);
    }



    closeDialog(): void {
        this.dialogRef.close();
    }

    applyFilters(): void {

        const selectedAmenities = Object.keys(this.filterFormGroup.value.amenities)
            .filter(key => this.filterFormGroup.value.amenities[key])
            .map(key => +key);

        const updatedData = {
            filterFormGroup: {
                price: this.filterFormGroup.value.price,
                accommodationType: this.filterFormGroup.value.accommodationType,
                amenities: selectedAmenities,
            },
        };

        this.dialogRef.close(updatedData);
    }

    formatLabel(value: number): string {
        if (value >= 1000) {
            return Math.round(value / 1000) + 'k';
        }

        return `${value}`;
    }


}
