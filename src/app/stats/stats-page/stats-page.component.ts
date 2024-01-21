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
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from '../../shared/shared.service';

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
        private authService : AuthService,
        private snackbar: MatSnackBar,
        private sharedService: SharedService
    ) { 
        this.myForm = new FormGroup({
            dateRange: new FormGroup({
                start: new FormControl<Date | null>(null),
                end: new FormControl<Date | null>(null)
            })
        });
    }

    get dateRangeFormGroup(): FormGroup {
        return this.myForm.get('dateRange') as FormGroup;
    }

    ngOnInit(): void {
        const date1 = new Date(2023, 1, 1);
        const milliseconds1 = date1.getTime();

        const date2 = new Date(2024, 11, 31);
        const milliseconds2 = date2.getTime();
        this.getAccommodationStats(milliseconds1, milliseconds2);
    }

    search(){
        const start = this.myForm.get('dateRange.start')?.value;
        const end = this.myForm.get('dateRange.end')?.value;
        if(!start || !end){
            this.openSnackBar("Please select the dates", "Close");
            return;
        }
        const miliSeconds1 = start.getTime();
        const milliseconds2 = end.getTime();
        this.getAccommodationStats(miliSeconds1,milliseconds2);
    }

    getAccommodationStats(start: number, end: number) {
        this.statsService.getForHost(this.authService.getId(), start, end).subscribe({
            next: (data : TotalStats) => {
                this.hostStats = data;
                this.mainMontlyStats = data.monthlyStats ?? [];
                
            },
            error: (error) => {
                let errorMessage = this.sharedService.getError(error, 'Error while getting stats');
                    this.sharedService.displaySnackWithButton(errorMessage, "OK");
            }
        });

        this.statsService.getAllAccommodationsForHost(this.authService.getId(), start, end).subscribe({
            next: (data : AccommodationTotalStats[]) => {
                this.allAccommodationStats = data;               
            },
            error: (error) => {
                let errorMessage = this.sharedService.getError(error, 'Error while getting accommodations');
                    this.sharedService.displaySnackWithButton(errorMessage, "OK");
            }
        });
    }

    downloadFile(){
        const date1 = new Date(2023, 0, 1);
        const milliseconds1 = date1.getTime();

        const date2 = new Date(2024, 11, 31);
        const milliseconds2 = date2.getTime();
        this.statsService.downloadHostFile(this.authService.getId(), milliseconds1, milliseconds2).subscribe(data => {
            const blob = new Blob([data], { type: 'application/pdf' });
            const url= window.URL.createObjectURL(blob);
            window.open(url);          
        });
    }


    openSnackBar(message: string, action: string) {
        this.snackbar.open(message, action);
    }
}
