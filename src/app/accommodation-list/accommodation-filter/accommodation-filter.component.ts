import { Component } from '@angular/core';

@Component({
  selector: 'app-accommodation-filter',
  templateUrl: './accommodation-filter.component.html',
  styleUrl: './accommodation-filter.component.css'
})
export class AccommodationFilterComponent {
    formatLabel(value: number): string {
        if (value >= 1000) {
          return Math.round(value / 1000) + 'k';
        }
    
        return `${value}`;
      }

      amenities = [
        { name: 'Wi-Fi', checked: false },
        { name: 'Swimming pool', checked: false },
        { name: 'Gym', checked: false },
        { name: 'Free parking', checked: false },
        { name: 'Air conditioning', checked: false },
        { name: 'BBQ', checked: false },
        { name: 'Lake view', checked: false },
        { name: 'Kitchen', checked: false },
        { name: 'TV', checked: false },
        { name: 'Pet friendly', checked: false },
        { name: 'Gym', checked: false },
        { name: 'Playground', checked: false }
        // Add more amenities as needed
      ];
}
