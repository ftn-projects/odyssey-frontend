import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { displayNav, role } from '../../../app.component';
import { Login } from './login.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { response } from 'express';
import { AuthResponse } from '../auth-response.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css', '../auth.style.css']
})
export class LoginComponent {
    constructor(private authService: AuthService,
        private router: Router) {

    }

    hidePassword = true;

    loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    });
    get emailInput() { return this.loginForm.get('email')?.value; }
    get passwordInput() { return this.loginForm.get('password')?.value; }

    ngOnInit() { displayNav.next(false); }
    ngOnDestroy() { displayNav.next(true); }


    onLogin(): void {
        if (this.loginForm.valid) {
            const login: Login = {
                username: this.emailInput,
                password: this.passwordInput
            }
            this.authService.login(login).subscribe({
                next: (response: AuthResponse) => {
                    localStorage.setItem('user', response.token);
                    this.authService.setUser()
                    this.router.navigate([""])
                }
            })
        }
    }
}
