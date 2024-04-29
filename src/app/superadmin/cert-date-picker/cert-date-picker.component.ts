import { Component, Input, Optional } from '@angular/core';
import { FormGroupDirective, FormGroup } from '@angular/forms';
import { AvailabilitySlot } from '../../accommodation/model/availability-slot.model';

@Component({
    selector: 'app-cert-date-picker',
    templateUrl: './cert-date-picker.component.html',
    styleUrl: './cert-date-picker.component.css'
})
export class CertDatePickerComponent {
    constructor(@Optional() public rootFormGroup: FormGroupDirective) {
        if (this.rootFormGroup) {
            this.form = this.rootFormGroup.control;
        }
    }

    @Input() certificate: any;
    @Input() form!: FormGroup;


    customDateFilter = (date: Date | null): boolean => {
        if (!date) {
            return false;
        }

        if (this.certificate) {
            const startDate = new Date(this.certificate.validity.start);
            const endDate = new Date(this.certificate.validity.end);
            return this.addDates(startDate, -1) <= date && date <= this.addDates(endDate, 1);
        }
        else {
            return false;
        }
    };

    addDates(date: Date, days: number) {
        var temp = new Date(date);
        temp.setDate(temp.getDate() + days);
        return temp;
    }
}
