import { Component, Input, OnInit } from '@angular/core';
import { COUNTRIES_DB_EU, Country } from '@angular-material-extensions/select-country';
import { User } from '../model/user.model';
import { UserService } from '../user.service';
import { PasswordUpdate } from '../model/password-update.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { SharedService } from '../../shared/shared.service';
import { environment } from '../../../env/env';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';


@Component({
    selector: 'app-account-management',
    templateUrl: './account-management.component.html',
    styleUrl: './account-management.component.css'
})
export class AccountManagementComponent implements OnInit {
    user: User = { 'address': {} };
    image: string = '';
    isDisabled: boolean = true;
    isOwner: boolean = false;

    userForm: FormGroup = new FormGroup({
        name: new FormControl({
            value: '',
            disabled: this.isDisabled
        }, [Validators.required]),
        surname: new FormControl({
            value: '',
            disabled: this.isDisabled
        }, [Validators.required]),
        email: new FormControl({
            value: '',
            disabled: this.isDisabled
        }, [Validators.required]),
        phone: new FormControl({
            value: '',
            disabled: this.isDisabled
        }, [Validators.required]),
        street: new FormControl({
            value: '',
            disabled: this.isDisabled
        }, [Validators.required]),
        city: new FormControl({
            value: '',
            disabled: this.isDisabled
        }, [Validators.required]),
        country: new FormControl({
            value: '',
            disabled: this.isDisabled
        }, [Validators.required]),
        bio: new FormControl({
            value: '',
            disabled: this.isDisabled
        })
    });

    passwordForm: FormGroup = new FormGroup({
        oldPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required])
    });

    constructor(
        private router: Router,
        private accountService: AccountService,
        private authService: AuthService,
        private sharedService: SharedService,
    ) {
    }

    ngOnInit(): void {
        this.accountService.findById(this.authService.getId()).subscribe({
            next: (user) => {
                this.user = user;
                this.isOwner = this.authService.getId() == this.user.id;
                this.image = `${environment.apiHost}users/image/${this.user.id}`;
                this.setFormData();
                this.userForm.updateValueAndValidity();
            },
            error: (err) => console.log(err)
        });
    }

    onImageSave() {
        this.sharedService.displaySnack('Image saved!');
    }

    protected onSavePassword() {
        if (this.passwordForm.invalid) return;

        if (this.passwordForm.value.confirmPassword != this.passwordForm.value.newPassword) {
            this.sharedService.displaySnack('Passwords do not match!');
            return;
        }

        const password: PasswordUpdate = {
            userId: this.user.id,
            oldPassword: this.passwordForm.value.oldPassword,
            newPassword: this.passwordForm.value.newPassword
        };

        this.accountService.updatePassword(password).subscribe({
            next: () => {
                this.passwordForm.reset();
                this.sharedService.displaySnack('Password changed!');
            },
            error: (err) => this.sharedService.displayFirstError(err)
        });
    }

    protected onSave(message: string = 'Changes saved!') {
        if (!this.userForm.valid) return;

        const updated: User = {
            name: this.userForm.value.name,
            surname: this.userForm.value.surname,
            email: this.userForm.value.email,
            phone: this.userForm.value.phone,
            address: {
                street: this.userForm.value.street,
                city: this.userForm.value.city,
                country: this.userForm.value.country
            },
            bio: this.userForm.value.bio
        }

        this.accountService.update(updated).subscribe({
            next: () => {
                this.user = updated;
                this.setFormDisabled(true);
                this.sharedService.displaySnack(message);
            },
            error: (err) => {
                this.sharedService.displayFirstError(err);
            }
        });
    }

    setFormDisabled(disabled: boolean) {
        this.isDisabled = disabled;
        this.userForm.updateValueAndValidity();
        const state = disabled ? 'disable' : 'enable';
        Object.keys(this.userForm.controls).forEach((controlName: string) =>
            this.userForm.controls[controlName][state]()
        );
    }

    private setFormData(): void {
        this.userForm.get('name')?.setValue(this.user.name);
        this.userForm.get('surname')?.setValue(this.user.surname);
        this.userForm.get('email')?.setValue(this.user.email);
        this.userForm.get('phone')?.setValue(this.user.phone);
        this.userForm.get('street')?.setValue(this.user.address.street);
        this.userForm.get('city')?.setValue(this.user.address.city);
        this.userForm.get('country')?.setValue(this.user.address?.country);
        this.userForm.get('bio')?.setValue(this.user.bio);
    }

    protected onEdit(): void {
        this.setFormDisabled(false);
    }

    protected onDeactivate() {
        if (!confirm('Are you sure you want to deactivate your account?')) return;

        if (!this.user.id) return;
        this.accountService.deactivate(this.user.id).subscribe({
            next: () => this.onLogout(),
            error: (err) => console.log(err)
        })
    }

    protected onCancel() {
        this.setFormData();
        this.setFormDisabled(true);
    }

    protected onLogout() {
        this.authService.removeUser();
        this.router.navigate(['']);
    }
}