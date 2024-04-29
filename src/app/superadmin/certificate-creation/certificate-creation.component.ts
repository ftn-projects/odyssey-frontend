import { Component, Inject } from '@angular/core';
import { User } from '../../user/model/user.model';
import { Certificate, parseKeyUsage } from '../model/certificate.model';
import { UserService } from '../../user/user.service';
import { SuperadminService } from '../superadmin.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from '../../shared/shared.service';
import { CertificateCreation } from '../model/certificate-creation.model';

@Component({
    selector: 'app-certificate-creation',
    templateUrl: './certificate-creation.component.html',
    styleUrl: './certificate-creation.component.css'
})
export class CertificateCreationComponent {
    selectedUser?: User;
    selectedCertificate: any;

    commonKeyUsages = ['Digital Signature', 'Non-Repudiation'];
    caKeyUsages = [...this.commonKeyUsages, 'Certificate Signer', 'CRL Signer'];
    httpsKeyUsages = ['Digital Signature', 'Key Data Encipherment', 'Key Agreement'];
    eeKeyUsages = [...this.commonKeyUsages, 'Key Data Encipherment', 'Data Encipherment', 'Key Agreement'];

    InputUser?: User;
    allUsers: User[] = [];
    allCertificates: Certificate[] = [];

    formGroup: FormGroup = new FormGroup({
        certType: new FormControl(),
        certControl: new FormControl(),
        userControl: new FormControl(),
        cnControl: new FormControl(),
        uidControl: new FormControl(),
        emailControl: new FormControl(),
        extensions: new FormControl([]),
        dateRange: new FormGroup({
            start: new FormControl(),
            end: new FormControl()
        })
    });

    constructor(
        private userService: UserService,
        private superadminService: SuperadminService,
        private sharedService: SharedService,
        public dialogRef: MatDialogRef<CertificateCreationComponent>,
        @Inject(MAT_DIALOG_DATA) public inputData: any
    ) {
        const name = inputData.request?.commonName.split(' ')[0];
        const surname = inputData.request?.commonName.split(' ')[1];
        let user: User | null = null;

        if (inputData.request != null)
            user = { id: inputData.request.uid, name: name, surname: surname, email: inputData.email, address: {} };

        this.formGroup.get('cnControl')?.setValue(inputData.request?.commonName);
        this.formGroup.get('uidControl')?.setValue(inputData.request?.uid);
        this.formGroup.get('emailControl')?.setValue(inputData.request?.email);

        if (inputData.request == null) {
            this.formGroup.get('certType')?.setValue('CA');
            this.formGroup.get('certControl')?.setValue(inputData.certificate);
            this.formGroup.get('certControl')?.disable();
        } else {
            this.formGroup.get('certType')?.setValue('USER_EE');
            this.formGroup.get('certType')?.disable();
            this.formGroup.get('cnControl')?.disable();
            this.formGroup.get('uidControl')?.disable();
            this.formGroup.get('emailControl')?.disable();
        }

        this.formGroup.get('certType')?.valueChanges.subscribe(_ => {
            this.formGroup.get('extensions')?.setValue([]);
        });
        this.formGroup.get('userControl')?.valueChanges.subscribe(user => {
            this.formGroup?.get('cnControl')?.setValue(user?.name + ' ' + user?.surname);
            this.formGroup?.get('uidControl')?.setValue(user?.id);
            this.formGroup?.get('emailControl')?.setValue(user?.email);
        });
    }

    ngOnInit(): void {
        this.loadUsers();
        this.loadCertificates();
    }

    loadUsers() {
        this.userService.getAll().subscribe({
            next: (data: User[]) => {
                this.allUsers = data;

                if (this.inputData.request != null) {
                    this.formGroup.get('userControl')?.patchValue(
                        this.allUsers.find(u => this.inputData.request?.uid == null || u.id == this.inputData.request.uid)
                    );
                    this.formGroup.get('userControl')?.disable();
                }
            },
            error: (err) => console.log(err)
        });
    }

    loadCertificates() {
        let isCa = (c: Certificate) => c.extensions?.find(e => e.name == 'Basic Constraints')?.values?.at(0) == 'true' ?? false;

        this.superadminService.getAllCertificates().subscribe({
            next: (data: Certificate[]) => {
                this.allCertificates = data.filter(isCa);
                this.formGroup.get('certControl')?.patchValue(
                    this.allCertificates.find(c => this.inputData.certificate?.alias == null || c.alias == this.inputData.certificate.alias)
                );
                if (this.inputData.request == null)
                    this.formGroup.get('certControl')?.disable();
            },
            error: (err) => console.log(err)
        });
    }

    isUser() {
        return this.formGroup.get('certType')?.value == 'USER_EE';
    }

    isExtensionChecked(extensionName: string): boolean {
        let extensions: string[] = this.formGroup.get('extensions')?.value as string[];
        return extensions.includes(extensionName);
    }

    toggleExtension(event: any, extensionName: string) {
        let extensions: string[] = this.formGroup.get('extensions')?.value || [];
        if (event.checked) {
            extensions = [...extensions, extensionName];
        } else {
            extensions = extensions.filter((ext: string) => ext !== extensionName);
        }
        this.formGroup.get('extensions')?.patchValue(extensions as never[]);
    }

    get dateRangeFormGroup(): FormGroup {
        return this.formGroup.get('dateRange') as FormGroup;
    }

    get getStartedDate() {
        return this.dateRangeFormGroup.get('start')?.value;
    }

    get getEndDate() {
        return this.dateRangeFormGroup.get('end')?.value;
    }

    get getExtensions() {
        return this.formGroup.get('extensions')?.value;
    }

    get getCertType() {
        return this.formGroup.get('certType')?.value;
    }

    get getSelectedUser() {
        return this.formGroup.get('userControl')?.value;
    }

    get getCommonName() {
        return this.formGroup.get('cnControl')?.value;
    }

    get getUid() {
        return this.formGroup.get('uidControl')?.value;
    }

    get getEmail() {
        return this.formGroup.get('emailControl')?.value;
    }

    get getSelectedCertificate() {
        return this.formGroup.get('certControl')?.value;
    }

    onSubmit() {
        let certificate: CertificateCreation = {
            parentAlias: this.getSelectedCertificate!.alias,
            commonName: this.getCommonName,
            uid: this.getUid,
            email: this.getEmail,
            startDate: this.getStartedDate.getTime(),
            endDate: this.getEndDate.getTime(),
            isHttps: this.getCertType == 'HTTPS' ? true : false,
            isCa: this.getCertType == 'CA' ? true : false,
            keyUsages: this.getExtensions.map((e: string) => parseKeyUsage[e])
        };

        this.superadminService.createCertificate(certificate).subscribe({
            next: (cert) => {
                console.log("Created:", cert);
                this.sharedService.displaySnack('Certificate created successfully');
                this.dialogRef.close("YES");
            },
            error: (err) => { console.log(err); this.sharedService.displayFirstError(err); }
        });
    }
}
