import { Component, Input, OnInit } from '@angular/core';
import { COUNTRIES_DB_EU, Country } from '@angular-material-extensions/select-country';
import { MatSnackBar } from '@angular/material/snack-bar';
import { role, userId } from '../../app.component';
import { User, UserRole } from '../model/user.model';
import { AccountService } from '../user.service';
import { PasswordUpdate } from '../model/password-update.model';
import { Router } from '@angular/router';
import { AuthService } from '../../infrastructure/auth/auth.service';

@Component({
    selector: 'app-account',
    templateUrl: './account-management.component.html',
    styleUrl: './account-management.component.css'
})
export class AccountManagementComponent implements OnInit {
    sections = [false, false, false, false];
    selectedCountry: Country = { alpha2Code: "RS" };

    @Input()
    protected user: User = { address: {} };
    protected editedUser: User = { address: {} };
    protected password: PasswordUpdate = {};
    protected newPasswordConfirm: string = "";

    constructor(private router: Router, protected service: AccountService, private snackbar: MatSnackBar, private authService: AuthService) {
    }

    ngOnInit(): void {
        this.service.get(userId.getValue()).subscribe({
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
    onImageSave() { this.displaySnack('Image saved!'); }
    protected onSavePassword() {
        if (this.newPasswordConfirm != this.password.newPassword) {
            this.displaySnack('Passwords do not match!');
            return;
        }

        this.service.updatePassword(this.password).subscribe({
            next: () => this.displaySnack('Password changed!'),
            error: (err) => this.displaySnack(err.error)
        });
        this.password = { userId: this.user.id }
        this.newPasswordConfirm = "";
    }
    protected onSave(message: string = 'Changes saved!') {
        this.service.update(this.user).subscribe({
            next: (user) => {
                this.user = user;
                this.displaySnack(message);
            },
            error: (err) => console.log(err.error)
        });
        this.editedUser = this.user;
    }

    protected onDeactivate() {
        if (!confirm('Are you sure you want to deactivate your account?')) return;

        this.service.deactivate(userId.getValue()).subscribe({
            next: () => this.onLogout(),
            error: (err) => console.log(err.message)
        })
    }

    protected onLogout() {
        this.authService.logout().subscribe({
            next: () => {
                localStorage.removeItem("user");
                this.authService.setUser();
                this.router.navigate(['']);
            },
            error: (err) => console.log(err)
        });
    }

    private displaySnack(text: string) { this.snackbar.open(text, '', { duration: 1000 }); }
    protected isHost(): boolean { return this.user.role == UserRole.Host; }
}