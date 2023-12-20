import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccommodationService } from '../accommodation.service';
import { AccommodationRequestService } from '../accommodation-request.service';

@Component({
    selector: 'app-accommodation-images-dialog',
    templateUrl: './accommodation-images-dialog.component.html',
    styleUrl: './accommodation-images-dialog.component.css'
})
export class AccommodationImagesDialogComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private accommodationService: AccommodationService, private accommodationRequestService: AccommodationRequestService, private dialogRef: MatDialogRef<AccommodationImagesDialogComponent>) { }

    imageNames: string[] = [];

    ngOnInit() {
        const stringArray = this.data.images;

        if (this.data.requests)
            this.imageNames.push(...stringArray.map((imageName: string) => this.accommodationRequestService.getImageUrl(this.data.id, imageName)));
        else this.imageNames.push(...stringArray.map((imageName: string) => this.accommodationService.getImageUrl(this.data.id, imageName)));

        console.log(this.imageNames);
    }

    closeDialog(): void {
        this.dialogRef.close();
    }
}
