import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AccommodationTotalStats } from '../model/accommodation-total-stats.model';
import { AccommodationService } from '../../accommodation/accommodation.service';
import { Dialog } from '@angular/cdk/dialog';
import { AccommodationStatsExpandedComponent } from '../accommodation-stats-expanded/accommodation-stats-expanded.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-accommodation-stat-card',
  templateUrl: './accommodation-stat-card.component.html',
  styleUrl: './accommodation-stat-card.component.css'
})
export class AccommodationStatCardComponent implements OnChanges{
    @Input() stats?: AccommodationTotalStats;
    imageSource?: string;

    constructor(
        private accommodationService : AccommodationService,
        private dialog : MatDialog
    ) { }

    ngOnChanges(): void {
        if(!this.stats?.accommodation) return;
        if(this.stats){
            
            this.accommodationService.getImageUrls(this.stats.accommodation.id).subscribe({
                next: (data) => {
                    this.imageSource = this.accommodationService.getImageUrl(this.stats?.accommodation?.id ?? 1, data[0]);
                }
            });
        }
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(AccommodationStatsExpandedComponent, {
          data: {stats: this.stats}
        });
      }
      
}
