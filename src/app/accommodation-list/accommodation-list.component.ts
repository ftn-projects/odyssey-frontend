import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrl: './accommodation-list.component.css'
})
export class AccommodationListComponent {

    applyParameterChildClass: boolean = false;
    dateRange = new FormGroup({
        start: new FormControl(),
        end: new FormControl()
      });

      isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])
  handleScroll(event: Event) {
    const scrollOffset = window.scrollY || document.documentElement.scrollTop;
    this.isSticky = scrollOffset > 50;
  }
}
