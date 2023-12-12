import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
    selector: 'app-search-daterange-picker',
    templateUrl: './search-daterange-picker.component.html',
    styleUrl: './search-daterange-picker.component.css'
})
export class SearchDaterangePickerComponent {
    constructor (private rootFormGroup : FormGroupDirective) { }

    form!: FormGroup;


    ngOnInit(): void {
        if(this.rootFormGroup){
        this.form = this.rootFormGroup.control;
        }
    }
}
