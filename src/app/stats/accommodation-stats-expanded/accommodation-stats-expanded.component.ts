import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { DialogData } from '../../review/confirm-dialog/confirm-dialog.component';
import { MonthlyStats } from '../model/monthly-stats.model';
import { AccommodationTotalStats } from '../model/accommodation-total-stats.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-accommodation-stats-expanded',
  templateUrl: './accommodation-stats-expanded.component.html',
  styleUrl: './accommodation-stats-expanded.component.css'
})
export class AccommodationStatsExpandedComponent {
    accommodationData!: AccommodationTotalStats;
    monthlyStats: MonthlyStats[] = [];
    constructor(
        public dialogRef: DialogRef<string>,
        @Inject(MAT_DIALOG_DATA) public data: any,
      ) {
        this.accommodationData = data.stats ?? [];
        this.monthlyStats = this.accommodationData.monthlyStats ?? [];
      }


}
