import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrl: './accommodation-list.component.css'
})
export class AccommodationListComponent {

    constructor(private dialog: MatDialog) {}

  openDialog() {
    console.log("Dialog opened");
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '60%',
      minWidth: '300px',
      height:'90vh'
    });
  }


    
    
      isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])
  handleScroll(event: Event) {
    const scrollOffset = window.scrollY || document.documentElement.scrollTop;
    this.isSticky = scrollOffset > 100;
  }
}
