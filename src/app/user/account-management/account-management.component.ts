import { Component, OnInit } from '@angular/core';
import { COUNTRIES_DB_EU, Country } from '@angular-material-extensions/select-country';
import { User } from '../model/user.model';
import { UserService } from '../user.service';
import { PasswordUpdate } from '../model/password-update.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { SharedService } from '../../shared/shared.service';
import { environment } from '../../../env/env';
import { CertificateRequest } from '../../superadmin/model/certificate-request.model';
import { CertificateStatus } from '../../superadmin/model/certificate-request.model';
import { SuperadminService } from '../../superadmin/superadmin.service';
import * as asn1js from 'asn1js';
import * as pkijs from 'pkijs';

@Component({
    selector: 'app-account',
    templateUrl: './account-management.component.html',
    styleUrl: './account-management.component.css'
})
export class AccountManagementComponent implements OnInit {
    sections = [false, false, false, false, false];
    selectedCountry: Country = { alpha2Code: 'RS' };
    id = -1;
    role = '';
    viewverRole = '';
    viewverId = -1;
    protected image = '';
    protected imageUpload = '';
    protected user: User = { address: {}, settings: {} };
    protected editedUser: User = this.deepcopy(this.user);
    protected password: PasswordUpdate = { oldPassword: '', newPassword: '' };
    protected confirmPassword: string = '';

    constructor(
        private router: Router,
        private userService: UserService,
        private authService: AuthService,
        private sharedService: SharedService,
        private route: ActivatedRoute,
        private superadminService: SuperadminService
    ) {
    }

    deepcopy(obj: any) {
        return JSON.parse(JSON.stringify(obj));
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = +params['id'];
        });
        this.viewverId = this.authService.getId();
        this.viewverRole = this.authService.getRole();
        this.image = `${environment.apiHost}users/image/${this.id}`;
        this.imageUpload = this.image;
        this.userService.findById(this.id).subscribe({
            next: (user) => {
                this.role = user.role ?? ' ';
                //THIS IS NOT GOOD, FIX THIS BECAUSE THE USER DOESN'T HAVE A ROLE SOMEHOW
                this.user = this.deepcopy(user);
                this.editedUser = this.deepcopy(user);
                this.password.userId = user.id;
                this.onSettingsChange();

                COUNTRIES_DB_EU.forEach((c, _) => {
                    if (c.name == this.user.address.country) this.selectedCountry = c;
                });

                this.superadminService.hasCertificate(user.name!, this.user.surname!).subscribe({
                    next: (result) => {
                        this.hasCertificate = result;
                        console.log(this.hasCertificate)
                    },
                    error: (err) => this.sharedService.displayError('Certificate info could not be acquired')
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
        this.userService.update(this.editedUser).subscribe({
            next: () => {
                this.sharedService.displaySnack(message);
                this.userService.findById(this.id).subscribe({
                    next: (user) => {
                        this.user = this.deepcopy(user);
                        this.editedUser = this.deepcopy(user);
                        this.onSettingsChange();
                    }
                });
            },
            error: (err) => {
                this.sharedService.displayFirstError(err);
                this.userService.findById(this.id).subscribe({
                    next: (user) => {
                        this.user = this.deepcopy(user);
                        this.editedUser = this.deepcopy(user);
                        this.onSettingsChange();
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

    protected settingsChanged: boolean = false;

    protected onSettingsChange() {
        let s1 = this.user.settings!;
        let s2 = this.editedUser.settings!;
        this.settingsChanged = !(
            s1.reservationRequested == s2.reservationRequested &&
            s1.reservationAccepted == s2.reservationAccepted &&
            s1.reservationDeclined == s2.reservationDeclined &&
            s1.reservationCancelled == s2.reservationCancelled &&
            s1.profileReviewed == s2.profileReviewed &&
            s1.accommodationReviewed == s2.accommodationReviewed);
    }

    protected hasCertificate = false;

    protected onCertificateSend() {
        let certificateRequest: CertificateRequest;
        certificateRequest = {
            commonName: this.user.name + " " + this.user.surname,
            email: this.user.email,
            uid: this.user.id!.toString(),
            date: new Date(),
            status: CertificateStatus.PENDING
        }
        this.superadminService.sendRequest(certificateRequest).subscribe({
            next: () => this.sharedService.displaySnack('Certificate request sent!'),
            error: (err) => this.sharedService.displayFirstError(err)
        });
    }

    protected onCertificateDownload() {
        this.superadminService.getByCommonName(this.user.name!, this.user.surname!).subscribe({
            next: (cert: Blob) => {
                cert.arrayBuffer().then((value) => {
                    this.parseSignature(value).then((success) => {
                        if (success) {
                            // const url = window.URL.createObjectURL(cert);
                            // window.open(url);
                        } else {
                            this.sharedService.displayError("Certificate validation failed.");
                        }
                    });
                });
            },
            error: (err) => {
                this.sharedService.displayError('Certificate could not be loaded');
                console.log(err);
            }
        });
    }

    private parseSignature(certificateBytes: any): Promise<boolean> {
        // Parse the X.509 certificate using asn1js library
        const asn1 = asn1js.fromBER(certificateBytes);
        const certificate = new pkijs.Certificate({ schema: asn1.result });
        const signature = certificate.signatureValue;

        return certificate.getPublicKey().then((key) => {
            // TODO verify signature
            return true;
        }).catch((error) => {
            console.log(error)
            return false;
        });
    }
}