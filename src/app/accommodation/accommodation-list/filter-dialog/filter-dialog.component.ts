import { Component, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-filter-dialog',
    templateUrl: './filter-dialog.component.html',
    styleUrl: './filter-dialog.component.css'
})
export class FilterDialogComponent {
    constructor(private elRef: ElementRef, private dialogRef: MatDialogRef<FilterDialogComponent>) { }


    closeDialog(): void {
        this.dialogRef.close();
    }

    applyFilters(): void {
        const filteredAmenities = this.amenities.filter((amenity) => amenity.checked);
        this.dialogRef.close();
    }


    formatLabel(value: number): string {
        if (value >= 1000) {
            return Math.round(value / 1000) + 'k';
        }

        return `${value}`;
    }

    amenities = [
        { name: 'Wi-Fi', checked: false },
        { name: 'Swimming pool', checked: false },
        { name: 'Gym', checked: false },
        { name: 'Free parking', checked: false },
        { name: 'Air conditioning', checked: false },
        { name: 'BBQ', checked: false },
        { name: 'Lake view', checked: false },
        { name: 'Kitchen', checked: false },
        { name: 'TV', checked: false },
        { name: 'Pet friendly', checked: false },
        { name: 'Gym', checked: false },
        { name: 'Playground', checked: false }
        // Add more amenities as needed
    ];
}
