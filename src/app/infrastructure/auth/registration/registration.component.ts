import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from '@angular-material-extensions/select-country';
import { displayNav } from '../../../app.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../../../user/user.service';
import { RegisteredUser } from './registration.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css', '../auth.style.css']
})
export class RegistrationComponent {
    constructor(private snackbar: MatSnackBar, private userService: AccountService,
        private router: Router) { }

    selectedRole = "guest";
    selectedCountry: Country = { name: "Serbia", alpha2Code: "RS" };
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

    onCountryChange($event: Country) { this.selectedCountry = $event }

    get emailInput() { return this.registrationForm.get('email')?.value; }
    get nameInput() { return this.registrationForm.get('name')?.value; }
    get surnameInput() { return this.registrationForm.get('surname')?.value; }
    get addressInput() { return this.registrationForm.get('address')?.value; }
    get cityInput() { return this.registrationForm.get('city')?.value; }
    get phoneInput() { return this.registrationForm.get('phone')?.value; }
    get passwordInput() { return this.registrationForm.get('password')?.value; }
    get confirmedInput() { return this.registrationForm.get('confirmedPassword')?.value; }

    ngOnInit() { displayNav.next(false); }
    ngOnDestroy() { displayNav.next(true); }

    onRegister(): void {
        if (this.registrationForm.valid) {
            if (this.passwordInput == this.confirmedInput) {
                const user: RegisteredUser = {
                    id: -1,
                    name: this.nameInput,
                    surname: this.surnameInput,
                    email: this.emailInput,
                    phone: this.phoneInput,
                    password: this.passwordInput,
                    role: this.selectedRole,
                    address: {
                        number: this.addressInput.split(" ").pop(), street: this.addressInput.split(" ").slice(0, -1).join(" "),
                        city: this.cityInput, country: this.selectedCountry.name
                    }
                };
                this.userService.add(user).subscribe({
                    next: (data: RegisteredUser) => {
                        this.router.navigate([''])
                    },
                    error: (err) => console.log(err)
                });
                this.displaySnack("Successful registration!");
            }
            else this.displaySnack("Passwords must match!");
        } else {
            this.displaySnack("Fill out every input correctly.");
        }
    }

    private displaySnack(text: string) { this.snackbar.open(text, '', { duration: 1000 }); }
}
