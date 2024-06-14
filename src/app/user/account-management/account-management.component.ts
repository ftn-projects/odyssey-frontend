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

    userInfoForm: FormGroup = new FormGroup({
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
        private userService: UserService,
        private authService: AuthService,
        private sharedService: SharedService,
    ) {
    }

    ngOnInit(): void {
        this.userService.findById(this.authService.getId()).subscribe({
            next: (user) => {
                this.user = user;
                this.isOwner = this.authService.getId() == this.user.id;
                this.image = `${environment.apiHost}users/image/${this.user.id}`;
                this.setFormData();
                this.userInfoForm.updateValueAndValidity();
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

        this.userService.updatePassword(password).subscribe({
            next: () => {
                this.passwordForm.reset();
                this.sharedService.displaySnack('Password changed!');
            },
            error: (err) => this.sharedService.displayFirstError(err)
        });
    }

    protected onSave(message: string = 'Changes saved!') {
        if (!this.userInfoForm.valid) return;

        this.user.name = this.userInfoForm.value.name;
        this.user.surname = this.userInfoForm.value.surname;
        this.user.email = this.userInfoForm.value.email;
        this.user.phone = this.userInfoForm.value.phone;
        this.user.address.street = this.userInfoForm.value.street;
        this.user.address.city = this.userInfoForm.value.city;
        this.user.address.country = this.userInfoForm.value.country;
        this.user.bio = this.userInfoForm.value.bio;

        this.userService.update(this.user).subscribe({
            next: () => {
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
        this.userInfoForm.updateValueAndValidity();
        const state = disabled ? 'disable' : 'enable';
        Object.keys(this.userInfoForm.controls).forEach((controlName: string) =>
            this.userInfoForm.controls[controlName][state]()
        );
    }

    private setFormData(): void {
        this.userInfoForm.get('name')?.setValue(this.user.name);
        this.userInfoForm.get('surname')?.setValue(this.user.surname);
        this.userInfoForm.get('email')?.setValue(this.user.email);
        this.userInfoForm.get('phone')?.setValue(this.user.phone);
        this.userInfoForm.get('street')?.setValue(this.user.address.street);
        this.userInfoForm.get('city')?.setValue(this.user.address.city);
        this.userInfoForm.get('country')?.setValue(this.user.address?.country);
        this.userInfoForm.get('bio')?.setValue(this.user.bio);
    }

    protected onEdit(): void {
        this.setFormDisabled(false);
    }

    protected onDeactivate() {
        if (!confirm('Are you sure you want to deactivate your account?')) return;

        if (!this.user.id) return;
        this.userService.deactivate(this.user.id).subscribe({
            next: () => this.onLogout(),
            error: (err) => console.log(err)
        })
    }

    protected onCancel() {
        this.setFormDisabled(true);
        this.setFormData();
    }

    protected onLogout() {
        this.authService.removeUser();
        this.router.navigate(['']);
    }
}