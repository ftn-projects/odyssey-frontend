import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { DialogData } from '../../review/confirm-dialog/confirm-dialog.component';
import { MonthlyStats } from '../model/monthly-stats.model';
import { AccommodationTotalStats } from '../model/accommodation-total-stats.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { StatsService } from '../stats.service';
import { AuthService } from '../../infrastructure/auth/auth.service';

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
        private statsService : StatsService,
        private authService: AuthService
      ) {
        this.accommodationData = data.stats ?? [];
        this.monthlyStats = this.accommodationData.monthlyStats ?? [];
      }

      downloadFile(){
        const date1 = new Date(2023, 0, 1);
        const milliseconds1 = date1.getTime();

        const date2 = new Date(2024, 11, 31);
        const milliseconds2 = date2.getTime();
        this.statsService.downloadAccommodationFile(this.authService.getId(), milliseconds1, milliseconds2).subscribe(data => {
            const blob = new Blob([data], { type: 'application/pdf' });
            const url= window.URL.createObjectURL(blob);
            window.open(url);          
        });
    }
      


}
