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

    OnInit() {
        // let now = new Date();
        // const startDate = new Date(this.certificate.validity.start);
        // const endDate = new Date(this.certificate.validity.end);

        // console.log('start', startDate);
        // console.log('end', endDate);
        // console.log(this.customDateFilter(now));
    }

    customDateFilter = (date: Date | null): boolean => {
        if (!date) {
            return false;
        }

        if (this.certificate) {
            const startDate = new Date(this.certificate.validity.start);
            const endDate = new Date(this.certificate.validity.end);

            this.dateToEpoch(startDate);
            this.dateToEpoch(endDate);
            let temp = date;
            this.dateToEpoch(temp);
            return startDate <= temp && temp <= endDate;
        }
        else {
            return false;
        }
    };

    dateToEpoch(thedate: Date) {
        return thedate.setHours(0, 0, 0, 0);
    }
}
