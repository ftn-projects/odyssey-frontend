import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { role } from '../../app.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css', '../style.css']
})
export class LoginComponent {
    signinForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [Validators.required, Validators.min(3)])
    });
    hide = true;
    get emailInput() { return this.signinForm.get('email')?.value; }
    get passwordInput() { return this.signinForm.get('password')?.value; }

    onLogin() {
        role.next(this.emailInput);
    }
}
