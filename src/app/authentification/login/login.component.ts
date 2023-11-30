import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { role } from '../../app.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css', '../style.css']
})
export class LoginComponent {
    loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('')
    });
    hide = true;
    get emailInput() { return this.loginForm.get('email')?.value; }
    get passwordInput() { return this.loginForm.get('password')?.value; }

    onLogin() {
        role.next(this.emailInput);
    }
}
