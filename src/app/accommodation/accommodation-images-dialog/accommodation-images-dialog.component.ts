import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccommodationService } from '../accommodation.service';

@Component({
  selector: 'app-accommodation-images-dialog',
  templateUrl: './accommodation-images-dialog.component.html',
  styleUrl: './accommodation-images-dialog.component.css'
})
export class AccommodationImagesDialogComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private service: AccommodationService, private dialogRef: MatDialogRef<AccommodationImagesDialogComponent>) {}

    imageNames: string[] = [];

  ngOnInit() {
    const stringArray = this.data.images;
    this.imageNames.push(...stringArray.map((imageName: string) => this.service.getImageUrl(this.data.id, imageName)));
    console.log(this.imageNames);
  }

  closeDialog(): void {
    this.dialogRef.close();
}
}
