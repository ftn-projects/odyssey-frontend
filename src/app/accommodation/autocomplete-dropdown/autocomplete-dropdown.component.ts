import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
    selector: 'app-autocomplete-dropdown',
    templateUrl: './autocomplete-dropdown.component.html',
    styleUrl: './autocomplete-dropdown.component.css'
})
export class AutocompleteDropdownComponent implements OnInit {
    @Input() isSticky = false;
    form!: FormGroup;
    constructor(private rootFormGroup: FormGroupDirective) { }
    myControl = new FormControl('');
    options: String[] = ['Novi Sad, Serbia', 'Belgrade, Serbia', 'Nis, Serbia'];
    filteredOptions!: Observable<String[]>;

    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => {
                // console.log("Value:" + value);
                const name = typeof value === 'string' ? value : value;
                return name ? this._filter(name as string) : this.options.slice();
            }),
        );

        if (this.rootFormGroup) {
            this.form = this.rootFormGroup.control;
        }
    }

    displayFn(user: string): string {
        return user ? user : '';
    }

    private _filter(name: string): String[] {
        const filterValue = name.toLowerCase();
        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }
}
