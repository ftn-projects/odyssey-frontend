import { Component, OnInit } from '@angular/core';
import { COUNTRIES_DB_EU, Country } from '@angular-material-extensions/select-country';
import { User } from '../model/user.model';
import { UserService } from '../user.service';
import { PasswordUpdate } from '../model/password-update.model';
import { Router } from '@angular/router';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { SharedService } from '../../shared/shared.service';
import { environment } from '../../../env/env';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-account',
    templateUrl: './account-management.component.html',
    styleUrl: './account-management.component.css'
})
export class AccountManagementComponent implements OnInit {
    sections = [false, false, false, false];
    selectedCountry: Country = { alpha2Code: 'RS' };

    private id = -1;
    protected role = '';
    protected image = '';
    protected imageUpload = '';
    protected user: User = { address: {} };
    protected editedUser: User = this.user;
    protected password: PasswordUpdate = { oldPassword: '', newPassword: '' };
    protected confirmPassword: string = '';

    constructor(
        private router: Router,
        private userService: UserService,
        private authService: AuthService,
        private sharedService: SharedService
    ) {
    }

    ngOnInit(): void {
        this.role = this.authService.getRole();
        this.id = this.authService.getId();

        this.image = `${environment.apiHost}users/image/${this.id}`;
        this.imageUpload = this.image;
        this.userService.findById(this.id).subscribe({
            next: (user) => {
                console.log(user);
                this.user = user;
                this.editedUser = user;
                this.password.userId = user.id;

                COUNTRIES_DB_EU.forEach((c, _) => {
                    if (c.name == this.user.address.country) this.selectedCountry = c;
                });
            },
            error: (err) => console.log(err)
        });
    }

    onEditing(index: number) {
        this.sections[index] = true;
        this.sections.forEach((_, i) => {
            if (i != index) this.sections[i] = false;
        });
    }

    onImageSave() {
        this.sharedService.displaySnack('Image saved!');
    }

    protected onSavePassword() {
        if (this.confirmPassword != this.password.newPassword) {
            this.sharedService.displaySnack('Passwords do not match!');
            return;
        }

        this.userService.updatePassword(this.password).subscribe({
            next: () => this.sharedService.displaySnack('Password changed!'),
            error: (err) => this.sharedService.displayFirstError(err)
        });
        this.password = { userId: this.user.id, oldPassword: '', newPassword: '' }
        this.confirmPassword = '';
    }

    protected onSave(message: string = 'Changes saved!') {
        console.log(this.user);
        this.userService.update(this.user).subscribe({
            next: () => this.sharedService.displaySnack(message),
            error: (err) => {
                this.sharedService.displayFirstError(err);

                this.userService.findById(this.id).subscribe({
                    next: (user) => {
                        this.user = user;
                        this.editedUser = user;
                    }
                });
            }
        });
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
        this.authService.removeUser();
        this.router.navigate(['']);
    }
}