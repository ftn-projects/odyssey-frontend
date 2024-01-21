import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { Accommodation } from '../model/accommodation.model';
import { AccommodationService } from '../accommodation.service';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-accommodation-list',
    templateUrl: './accommodation-list.component.html',
    styleUrl: './accommodation-list.component.css'
})
export class AccommodationListComponent {
    favoriteAccommodationIds?: number[];
    searchParameters: FormGroup;
    amenities: number[] = []
    constructor(
        private dialog: MatDialog, 
        private service: AccommodationService, 
        private fb: FormBuilder,
        private authService: AuthService,
        private snackbar: MatSnackBar,
        ) {
        this.searchParameters = fb.group({
            location: fb.group({
                address: [''],
            }),
            dateRange: fb.group({
                start: new FormControl<Date | null>(null),
                end: new FormControl<Date | null>(null)
            }),
            guestGroup: fb.group({
                guests: [],
            }),
            filterFormGroup: fb.group({
                price: fb.group({
                    min: [],
                    max: [],
                }),
                accommodationType: [''],
                amenities: this.fb.array([]),
            }),
            favorite: new FormControl<boolean>(false)
        });
        
    }

    get dateRangeFormGroup(): FormGroup {
        return this.searchParameters.get('dateRange') as FormGroup;
    }




    accommodations: Accommodation[] = [];

    ngOnInit(): void {
        this.service.getAll().subscribe({
            next: (data: Accommodation[]) => {
                this.accommodations = data;
            },
            error: (err) => { console.log(err) }
        })
    }


    searchUpgraded(){
        if(this.authService.isLoggedIn() && this.authService.getRole() == "GUEST"){
            this.service.getFavorites(this.authService.getId()).subscribe({
                next: (data: Accommodation[]) => {
                    this.favoriteAccommodationIds = data.map(accommodation => accommodation.id);
                    this.search();
                },
                error: (err) => { console.log(err) }
            })
        }
        else{
            this.search();
        }
    }

    search() {
        console.log("Search parameters: ", this.searchParameters);
        const locationAddress = this.searchParameters.get('location.address')?.value.trim() === '' ? null : this.searchParameters.get('location.address')?.value.trim();
        const startDate = this.searchParameters.get('dateRange.start')?.value?.getTime();
        const endDate = this.searchParameters.get('dateRange.end')?.value?.getTime();
        const guestNumber = this.searchParameters.get('guestGroup.guests')?.value;
        const priceMin = this.searchParameters.get('filterFormGroup.price.min')?.value;
        const priceMax = this.searchParameters.get('filterFormGroup.price.max')?.value;
        const accommodationType = this.searchParameters.get('filterFormGroup.accommodationType')?.value === '' ?
            null : this.searchParameters.get('filterFormGroup.accommodationType')?.value;
        const amenitiesParam = (this.amenities && this.amenities.length > 0) ? this.amenities : null;


        this.service.getAll(locationAddress, startDate, endDate, guestNumber, amenitiesParam, accommodationType, priceMin, priceMax).subscribe({
            next: (data: Accommodation[]) => {
                if(this.favoriteAccommodationIds && this.searchParameters.get('favorite')?.value == true){
                    console.log("All favorites: ", this.favoriteAccommodationIds);
                    this.accommodations = data.filter(accommodation => this.favoriteAccommodationIds?.includes(accommodation.id));
                }
                else{
                    this.accommodations = data;
                }
            },
            error: (err) => { console.log(err) }
        })
    }



    openDialog() {
        console.log("Dialog opened");
        let dialogRef = this.dialog.open(FilterDialogComponent, {
            width: '60%',
            minWidth: '300px',
            height: '90vh',
            data: {
                filterFormGroup: this.searchParameters.get('filterFormGroup')?.value
            }

        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('Dialog closed');

            if (result) {
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
