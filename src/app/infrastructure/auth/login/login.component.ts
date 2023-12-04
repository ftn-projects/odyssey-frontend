import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { displayNav, role } from '../../../app.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css', '../auth.style.css']
})
export class LoginComponent {
    hidePassword = true;

    loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('')
    });
    get emailInput() { return this.loginForm.get('email')?.value; }
    get passwordInput() { return this.loginForm.get('password')?.value; }

    ngOnInit() { displayNav.next(false); }
    ngOnDestroy() { displayNav.next(true); }

    onLogin() { role.next(this.emailInput); }
}
