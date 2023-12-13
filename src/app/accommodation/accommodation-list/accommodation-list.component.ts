import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { Accommodation } from '../model/accommodation.model';
import { User } from '../../account/model/user.model';
import { AccommodationService } from '../accommodation.service';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

@Component({
    selector: 'app-accommodation-list',
    templateUrl: './accommodation-list.component.html',
    styleUrl: './accommodation-list.component.css'
})
export class AccommodationListComponent {

    searchParameters: FormGroup;
    amenities: number[] = []
    constructor(private dialog: MatDialog, private service: AccommodationService, private fb: FormBuilder) {
        this.searchParameters = fb.group({
            location: fb.group({
                address: [''],
            }),
            dateRange: fb.group({
                start: [null],
                end: [null],
            }),
            guestGroup: fb.group({
                guests: [0],
            }),
            filterFormGroup: fb.group({
                price: fb.group({
                    min: [200],
                    max: [1000],
                }),
                accommodationType: [''],
                
                amenities: this.fb.array([]),
            }),
           
        });
    }


    accommodations: Accommodation[] = [];

    ngOnInit(): void {
        this.service.getAll().subscribe({
            next: (data: Accommodation[]) => {
                this.accommodations = data
            },
            error: (_) => { console.log("Greska!") }
        })
    }



    search() {
        const locationAddress = this.searchParameters.get('location.address')?.value;
        const startDate = this.searchParameters.get('dateRange.start')?.value?.getTime();
        const endDate = this.searchParameters.get('dateRange.end')?.value?.getTime();
        const guestNumber = this.searchParameters.get('guestGroup.guests')?.value;
        const priceMin = this.searchParameters.get('filterFormGroup.price.min')?.value;
        const priceMax = this.searchParameters.get('filterFormGroup.price.max')?.value;
        const accommodationType = this.searchParameters.get('filterFormGroup.accommodationType')?.value === '' ?
        null : this.searchParameters.get('filterFormGroup.accommodationType')?.value;
        const amenitiesParam = (this.amenities && this.amenities.length > 0) ? this.amenities : null;
        console.log("Location: " + locationAddress)
        console.log("Start date: " + startDate)
        console.log("End date: " + endDate)
        console.log("Guest number: " + guestNumber)
        console.log("Price min: " + priceMin)
        console.log("Price max: " + priceMax)
        console.log("Accommodation type: " + accommodationType)
        console.log("Amenities: " + amenitiesParam)
        
    
        this.service.getAll(startDate, endDate, guestNumber, amenitiesParam, accommodationType, priceMin, priceMax).subscribe({
            next: (data: Accommodation[]) => {
                this.accommodations = data
            },
            error: (_) => { console.log("Greska!") }
        });
    }



    openDialog() {
        console.log("Dialog opened");
        let dialogRef = this.dialog.open(FilterDialogComponent, {
            width: '60%',
            minWidth: '300px',
            height: '90vh',
            data:{
                filterFormGroup: this.searchParameters.get('filterFormGroup')?.value
            }
            
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('Dialog closed');
            
            if(result){
                this.searchParameters.get('filterFormGroup')?.patchValue(result.filterFormGroup);
               this.searchParameters.value.filterFormGroup = result.filterFormGroup;
               this.amenities = result.filterFormGroup.amenities;
               

            }
            console.log(this.searchParameters.value);
            
        });
        
    }

    

    isSticky: boolean = false;

    @HostListener('window:scroll', ['$event'])
    handleScroll(event: Event) {
        const scrollOffset = window.scrollY || document.documentElement.scrollTop;
        this.isSticky = scrollOffset > 150;
    }
}
