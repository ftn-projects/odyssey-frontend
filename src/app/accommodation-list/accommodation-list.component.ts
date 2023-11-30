import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { Accommodation } from '../accommodation-list/accommodation-model';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrl: './accommodation-list.component.css'
})
export class AccommodationListComponent {

    constructor(private dialog: MatDialog) {}

    accommodations: Accommodation[] = [
        {
          name: 'Central Plaza Hotel',
          location: 'Paris, France',
          rating: 4.5,
          distance: '2 miles',
          price: 200,
          pricingType: 'per night',
          totalPrice: 600
        },
        {
          name: 'Downtown Loft Retreat',
          location: 'New York City, USA',
          rating: 4.2,
          distance: '1.5 miles',
          price: 100,
          pricingType: 'per night',
          totalPrice: 300
        },
        {
          name: 'Seaside Resort Paradise',
          location: 'Barcelona, Spain',
          rating: 4.8,
          distance: '3 miles',
          price: 300,
          pricingType: 'per night',
          totalPrice: 900
        },
        {
          name: 'Historic Charm Inn',
          location: 'Rome, Italy',
          rating: 4.0,
          distance: '0.5 miles',
          price: 120,
          pricingType: 'per night',
          totalPrice: 360
        },
        {
          name: 'Skyline View Apartment',
          location: 'Tokyo, Japan',
          rating: 4.5,
          distance: '2 miles',
          price: 180,
          pricingType: 'per night',
          totalPrice: 540
        },
        {
          name: 'Suburban Family House',
          location: 'Sydney, Australia',
          rating: 4.2,
          distance: '5 miles',
          price: 150,
          pricingType: 'per night',
          totalPrice: 450
        },
        {
          name: 'Budget-friendly Hostel',
          location: 'Bangkok, Thailand',
          rating: 3.8,
          distance: '1 mile',
          price: 50,
          pricingType: 'per night',
          totalPrice: 150
        },
        {
          name: 'Modern Apartment City Center',
          location: 'Berlin, Germany',
          rating: 4.7,
          distance: '2 miles',
          price: 160,
          pricingType: 'per night',
          totalPrice: 480
        },
      ];
      
      





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
    this.isSticky = scrollOffset > 150;
  }
}
