import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface User {
    name: string;
}

@Component({
    selector: 'app-autocomplete-dropdown',
    templateUrl: './autocomplete-dropdown.component.html',
    styleUrl: './autocomplete-dropdown.component.css'
})
export class AutocompleteDropdownComponent implements OnInit {
    @Input() isSticky = false;

    myControl = new FormControl<string | User>('');
    options: User[] = [{ name: 'Novi Sad, Serbia' }, { name: 'Belgrade, Serbia' }, { name: 'Nis, Serbia' }];
    filteredOptions!: Observable<User[]>;

    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => {
                const name = typeof value === 'string' ? value : value?.name;
                return name ? this._filter(name as string) : this.options.slice();
            }),
        );
    }

    displayFn(user: User): string {
        return user && user.name ? user.name : '';
    }

    private _filter(name: string): User[] {
        const filterValue = name.toLowerCase();
        return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
    }
}
