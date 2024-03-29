import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from './login.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AuthResponse } from '../auth-response.model';
import { SharedService } from '../../../shared/shared.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css', '../auth.style.css']
})
export class LoginComponent {
    constructor(
        private router: Router,
        private authService: AuthService,
        private sharedService: SharedService) {
    }

    hidePassword = true;

    loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    });
    get emailInput() { return this.loginForm.get('email')?.value; }
    get passwordInput() { return this.loginForm.get('password')?.value; }

    ngOnInit() { this.sharedService.hideNavbar(); }
    ngOnDestroy() { this.sharedService.showNavbar(); }


    onLogin(): void {
        if (this.loginForm.valid) {
            const login: Login = {
                username: this.emailInput,
                password: this.passwordInput
            };
            this.authService.login(login).subscribe({
                next: (response: AuthResponse) => {
                    this.authService.setUser(response.token);
                    this.sharedService.displaySnack('Successful login!');
                    this.router.navigate(['']);
                },
                error: (err) => {
                    console.log(err);

                    let errorMessage = this.sharedService.getError(err, 'Invalid email or password!');
                    this.sharedService.displaySnackWithButton(errorMessage, "OK");
                }
            });
        }
        else {
            this.sharedService.displaySnack('Fill out every input correctly.');
        }
    }
}
