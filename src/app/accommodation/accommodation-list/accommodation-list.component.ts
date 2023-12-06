import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { Accommodation } from '../model/accommodation.model';
import { User } from '../../account/model/user.model';
import { AccommodationService } from '../accommodation.service';

@Component({
    selector: 'app-accommodation-list',
    templateUrl: './accommodation-list.component.html',
    styleUrl: './accommodation-list.component.css'
})
export class AccommodationListComponent {

    constructor(private dialog: MatDialog, private service: AccommodationService) { }


    accommodations: Accommodation[] = [];

    ngOnInit(): void {
        this.service.getAll().subscribe({
          next: (data: Accommodation[]) => {
            this.accommodations = data
            this.accommodations.forEach((accommodation) => {
              console.log(accommodation)
            })
          },
          error: (_) => {console.log("Greska!")}
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
