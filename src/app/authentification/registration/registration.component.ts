import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from '@angular-material-extensions/select-country';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css', '../style.css']
})
export class RegistrationComponent {
    selectedRole = "guest";
    selectedCountry: Country = { alpha2Code: "RS" };
    registrationForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        surname: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirmedPassword: new FormControl('', [Validators.required])
    });
}
