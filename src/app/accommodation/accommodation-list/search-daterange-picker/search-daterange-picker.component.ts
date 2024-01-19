import { Component, Input, Optional } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { AvailabilitySlot } from '../../model/availability-slot.model';

@Component({
    selector: 'app-search-daterange-picker',
    templateUrl: './search-daterange-picker.component.html',
    styleUrl: './search-daterange-picker.component.css'
})
export class SearchDaterangePickerComponent {
    constructor (@Optional() public rootFormGroup : FormGroupDirective) {
        if(this.rootFormGroup){
            this.form = this.rootFormGroup.control;
            }
     }
    @Input() availableSlots: AvailabilitySlot[] | null = null;
    @Input() form!: FormGroup;


    customDateFilter = (date: Date | null): boolean => {
        if (!date) {
          return false;
        }
        
        if (this.availableSlots) {
          return this.availableSlots.some(
            slot => this.isDateInSlot(date, slot)
          );
        }
        else{
            return true;
        }
      };
    
      private isDateInSlot(date: Date, slot: AvailabilitySlot): boolean {
        const startDate = new Date(slot.timeSlot.start);
        const endDate = new Date(slot.timeSlot.end);
        return date >= startDate && date <= endDate;
      }

}
