import { Component } from '@angular/core';
import { Country } from '@angular-material-extensions/select-country';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrl: './registration.component.css'
})
export class RegistrationComponent {
    selected = "guest";
}
