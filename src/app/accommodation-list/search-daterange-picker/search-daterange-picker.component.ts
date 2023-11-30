import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Accommodation } from '../accommodation-model';

@Component({
  selector: 'app-search-daterange-picker',
  templateUrl: './search-daterange-picker.component.html',
  styleUrl: './search-daterange-picker.component.css'
})
export class SearchDaterangePickerComponent {
    @Input() isSticky = false;
    dateRange = new FormGroup({
        start: new FormControl(),
        end: new FormControl()
      });
}
