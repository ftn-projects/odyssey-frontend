import { Component, Input, OnInit } from '@angular/core';
import { COUNTRIES_DB_EU, Country } from '@angular-material-extensions/select-country';
import { User } from '../model/user.model';
import { UserService as UserService } from '../user.service';
import { PasswordUpdate } from '../model/password-update.model';
import { Router } from '@angular/router';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { SharedService } from '../../shared/shared.service';

@Component({
    selector: 'app-account',
    templateUrl: './account-management.component.html',
    styleUrl: './account-management.component.css'
})
export class AccountManagementComponent implements OnInit {
    sections = [false, false, false, false];
    selectedCountry: Country = { alpha2Code: 'RS' };

    protected role = '';
    protected user: User = { address: {} };
    protected editedUser: User = { address: {} };
    protected password: PasswordUpdate = {};
    protected newPasswordConfirm: string = '';

    constructor(
        private router: Router,
        private userService: UserService,
        private authService: AuthService,
        private sharedService: SharedService
    ) {
    }

    ngOnInit(): void {
        this.role = this.authService.getRole();
        let email = this.authService.getEmail();

        this.userService.findByEmail(email).subscribe({
            next: (user) => this.user = user,
            error: (err) => console.log(err)
        });
        this.editedUser = this.user;

        COUNTRIES_DB_EU.forEach((c, _) => {
            if (c.name == this.user.address.country) this.selectedCountry = c;
        });
        this.password = { userId: this.user.id };
    }

    onEditing(index: number) {
        this.sections[index] = true;
        this.sections.forEach((_, i) => {
            if (i != index) this.sections[i] = false;
        });
    }

    onImageSave() { this.sharedService.displaySnack('Image saved!'); }
    protected onSavePassword() {
        if (this.newPasswordConfirm != this.password.newPassword) {
            this.sharedService.displaySnack('Passwords do not match!');
            return;
        }

        this.userService.updatePassword(this.password).subscribe({
            next: () => this.sharedService.displaySnack('Password changed!'),
            error: (err) => console.log(err)
        });
        this.password = { userId: this.user.id }
        this.newPasswordConfirm = '';
    }

    protected onSave(message: string = 'Changes saved!') {
        this.userService.update(this.user).subscribe({
            next: (user) => {
                this.user = user;
                this.sharedService.displaySnack(message);
            },
            error: (err) => console.log(err)
        });
        this.editedUser = this.user;
    }

    protected onDeactivate() {
        if (!confirm('Are you sure you want to deactivate your account?')) return;

        if (!this.user.id) return;
        this.userService.deactivate(this.user.id).subscribe({
            next: () => this.onLogout(),
            error: (err) => console.log(err)
        })
    }

    protected onLogout() {
        this.authService.logout().subscribe({
            next: () => {
                localStorage.removeItem('user');
                this.authService.setUser();
                this.router.navigate(['']);
            },
            error: (err) => console.log(err)
        });
    }
}