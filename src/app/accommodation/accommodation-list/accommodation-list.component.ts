import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { Accommodation } from '../model/accommodation.model';
import { AccommodationService } from '../accommodation.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-accommodation-list',
    templateUrl: './accommodation-list.component.html',
    styleUrl: './accommodation-list.component.css'
})
export class AccommodationListComponent {

    searchParameters: FormGroup;

    constructor(private dialog: MatDialog, private service: AccommodationService) {
        this.searchParameters = new FormGroup({
            location: new FormGroup({
                address: new FormControl('')
            }),
            dateRange: new FormGroup({
                start: new FormControl<Date | null>(null),
                end: new FormControl<Date | null>(null)
            }),
            guestGroup: new FormGroup({
                guests: new FormControl(0)
            })
        });
    }


    accommodations: Accommodation[] = [];

    ngOnInit(): void {
        this.service.getAll().subscribe({
            next: (data: Accommodation[]) => {
                this.accommodations = data
                this.accommodations.forEach((accommodation) => {
                    console.log(accommodation)
                })
            },
            error: (err) => { console.log(err) }
        })
    }



    search() {
        const locationAddress = this.searchParameters.get('location.address')?.value;
        const startDate = this.searchParameters.get('dateRange.start')?.value?.getTime();
        const endDate = this.searchParameters.get('dateRange.end')?.value?.getTime();
        const guestNumber = this.searchParameters.get('guestGroup.guests')?.value;

        this.service.getAll(startDate, endDate, guestNumber).subscribe({
            next: (data: Accommodation[]) => {
                this.accommodations = data
                this.accommodations.forEach((accommodation) => {
                    console.log(accommodation)
                })
            },
            error: (err) => { console.log(err) }
        })
    }



    openDialog() {
        console.log("Dialog opened");
        const dialogRef = this.dialog.open(FilterDialogComponent, {
            width: '60%',
            minWidth: '300px',
            height: '90vh'
        });
    }

    isSticky: boolean = false;

    @HostListener('window:scroll', ['$event'])
    handleScroll(event: Event) {
        const scrollOffset = window.scrollY || document.documentElement.scrollTop;
        this.isSticky = scrollOffset > 150;
    }
}
