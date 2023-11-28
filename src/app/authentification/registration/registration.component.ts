import { Component } from '@angular/core';
import { Country } from '@angular-material-extensions/select-country';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css', '../style.css']
})
export class RegistrationComponent {
    selected = "guest";
}
