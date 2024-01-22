import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from '@angular-material-extensions/select-country';
import { UserService } from '../../../user/user.service';
import { RegisteredUser } from './registration.model';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import { Observable, throwError } from 'rxjs';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css', '../auth.style.css']
})
export class RegistrationComponent {
    constructor(
        private router: Router,
        private userService: UserService,
        private sharedService: SharedService) {
    }

    hidePassword = true;
    hideConfirmedPassword = true;
    selectedRole = 'GUEST';
    registrationForm: FormGroup = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.pattern('^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$')
        ]),
        name: new FormControl('', [Validators.required]),
        surname: new FormControl('', [Validators.required]),
        street: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirmedPassword: new FormControl('', [Validators.required])
    });

    // onCountryChange($event: Country) { this.selectedCountry = $event }

    get emailInput() { return this.registrationForm.get('email')?.value; }
    get nameInput() { return this.registrationForm.get('name')?.value; }
    get surnameInput() { return this.registrationForm.get('surname')?.value; }
    get streetInput() { return this.registrationForm.get('street')?.value; }
    get cityInput() { return this.registrationForm.get('city')?.value; }
    get countryInput() { return this.registrationForm.get('country')?.value; }
    get phoneInput() { return this.registrationForm.get('phone')?.value; }
    get passwordInput() { return this.registrationForm.get('password')?.value; }
    get confirmedInput() { return this.registrationForm.get('confirmedPassword')?.value; }

    ngOnInit() { this.sharedService.hideNavbar(); }
    ngOnDestroy() { this.sharedService.showNavbar(); }

    onRegister(): void {
        if (this.registrationForm.valid) {
            if (this.passwordInput == this.confirmedInput) {
                this.register().subscribe({
                    next: () => {
                        this.sharedService.displaySnack('Successful registration!');
                        this.router.navigate(['']);
                    },
                    error: (err) => this.sharedService.displayFirstError(err)
                });
            }
            else this.sharedService.displayError('Passwords must match!');
        } else {
            this.sharedService.displayError('Fill out every input correctly.');

            const controls = this.registrationForm.controls;
            for (const name in controls) {
                if (controls[name].invalid) {
                    console.log(controls[name])
                }
            }
        }
    }

    register(): Observable<RegisteredUser> {
        const user: RegisteredUser = {
            id: 1,
            name: this.nameInput,
            surname: this.surnameInput,
            email: this.emailInput,
            phone: this.phoneInput,
            password: this.passwordInput,
            role: this.selectedRole,
            address: {
                street: this.streetInput,
                city: this.cityInput, country: this.countryInput
            }
        };
        return this.userService.add(user);
    }
}

