import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { AvailabilitySlot } from '../../model/availability-slot.model';

@Component({
    selector: 'app-search-daterange-picker',
    templateUrl: './search-daterange-picker.component.html',
    styleUrl: './search-daterange-picker.component.css'
})
export class SearchDaterangePickerComponent  {
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
            let returnValue = this.availableSlots.some(
            slot => this.isDateInSlot(date, slot)
          );
            return returnValue;
        }
        else{
            return true;
        }
      };
    
      private parseToDate(arrayDate: any) : Date {
        
        return new Date(arrayDate[0], arrayDate[1] - 1, arrayDate[2], arrayDate[3], arrayDate[4])
      }

      private isDateInSlot(date: Date, slot: AvailabilitySlot): boolean {
        const startDate = this.parseToDate(slot.timeSlot.start);
        const endDate = this.parseToDate(slot.timeSlot.end);
        return date >= startDate && date <= endDate;
      }

}
