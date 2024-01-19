import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { StatsModule } from '../stats.module';
import * as echarts from 'echarts';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TotalStats } from '../model/total-stats.model';
import { StatsService } from '../stats.service';
import { AccommodationTotalStats } from '../model/accommodation-total-stats.model';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { MonthlyStats } from '../model/monthly-stats.model';

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrl: './stats-page.component.css'
})
export class StatsPageComponent implements OnInit{
    myForm!: FormGroup;
    mainMontlyStats: MonthlyStats[] = [];
    allAccommodationStats?: AccommodationTotalStats[];
    hostStats?: TotalStats;
    constructor(
        private formBuilder: FormBuilder,
        private statsService : StatsService,
        private authService : AuthService
    ) { 
        this.myForm = new FormGroup({
            dateRange: new FormGroup({
                start: new FormControl<Date | null>(null),
                end: new FormControl<Date | null>(null)
            })
        });
    }

    ngOnInit(): void {
        this.getAccommodationStats();
    }

    getAccommodationStats() {
        const start = this.myForm.get('dateRange.start')?.value;
        const end = this.myForm.get('dateRange.end')?.value;
        
        const date1 = new Date(2023, 0, 1);
        const milliseconds1 = date1.getTime();

        const date2 = new Date(2024, 11, 31);
        const milliseconds2 = date2.getTime();


        this.statsService.getForHost(this.authService.getId(), milliseconds1, milliseconds2).subscribe({
            next: (data : TotalStats) => {
                this.hostStats = data;
                this.mainMontlyStats = data.monthlyStats ?? [];
                
            },
            error: (error) => {
                console.error('Error fetching stats:', error);
            }
        });

        this.statsService.getAllAccommodationsForHost(this.authService.getId(), milliseconds1, milliseconds2).subscribe({
            next: (data : AccommodationTotalStats[]) => {
                this.allAccommodationStats = data;               
            },
            error: (error) => {
                console.error('Error fetching stats:', error);
            }
        });



    }
}
