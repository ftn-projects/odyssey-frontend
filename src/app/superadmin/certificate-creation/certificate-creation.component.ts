import { Component, Inject } from '@angular/core';
import { User } from '../../user/model/user.model';
import { Certificate } from '../model/certificate.mode';
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

    keyUsages = ['Digital Signature', 'Non-Repudiation', 'Key Data Encipherment', 'Data Encipherment', 'Key Agreement'];
    caSpecific = ['Certificate Signer', 'CRL Signer'];

    InputUser?: User;
    allUsers: User[] = [];
    allCertificates: Certificate[] = [];
    formGroup = new FormGroup({
        userControl: new FormControl(),
        certControl: new FormControl(),
        extensions: new FormControl([]),
        dateRange: new FormGroup({
            start: new FormControl(),
            end: new FormControl()
        }),
        crtType: new FormControl()
    });

    constructor(
        private userService: UserService,
        private superadminService: SuperadminService,
        private sharedService: SharedService,
        public dialogRef: MatDialogRef<CertificateCreationComponent>,
        @Inject(MAT_DIALOG_DATA) public inputData: any
    ) {
    }

    ngOnInit(): void {
        this.loadUsers();
        this.loadCertificates();

        this.formGroup.get('certControl')?.valueChanges.subscribe((newValue) => {
            this.formGroup.get('extensions')?.setValue([]);
        });
    }

    loadUsers() {
        this.userService.getAll().subscribe({
            next: (data: User[]) => {
                this.allUsers = data;
            },
            error: (err) => console.log(err)
        });
    }

    loadCertificates() {
        this.superadminService.getAllCertificates().subscribe({
            next: (data: any[]) => {
                console.log(data);
                this.allCertificates = data;
            },
            error: (err) => console.log(err)
        });
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

    get getCrtType() {
        return this.formGroup.get('crtType')?.value;
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
        this.formGroup.get('extensions')?.setValue(extensions as never[]);
    }


    get getSelectedUser() {
        return this.formGroup.get('userControl')?.value;
    }

    get getSelectedCertificate() {
        return this.formGroup.get('certControl')?.value;
    }

    onSubmit() {

        let extensionStrings: string[] = this.getExtensions ?? [];

        // Map extension strings to enum values
        let extensionEnums: string[] = extensionStrings.map(ext => this.convertStringToEnumRepresentation(ext));

        // Create an empty map to hold the extensions
        let extensionsMap: Map<string, string[]> = new Map<string, string[]>();

        // Populate the map with the enum values as keys and empty arrays as values
        extensionEnums.forEach(ext => {
            extensionsMap.set(ext, []);
        });
        const newMap: Record<string, string[]> = {};
        extensionsMap.forEach((val: string[], key: string) => {
            newMap[key] = val;
        });

        // Create the certificate object
        let certificate: CertificateCreation = {
            parentAlias: this.getSelectedCertificate?.alias,
            commonName: this.getSelectedUser?.name + ' ' + this.getSelectedUser?.surname,
            uid: this.getSelectedUser?.id,
            startDate: this.getStartedDate.getTime(),
            endDate: this.getEndDate.getTime(),
            isHttps: this.getCrtType == 'HTTPS' ? true : false,
            isCa: this.getCrtType == 'CA' ? true : false,
            keyUsages: [] // TODO adjust
        };

        console.log("Certificate: ", certificate);

        this.superadminService.createCertificate(certificate).subscribe({
            next: (cert) => {
                console.log("Created:", cert);
                this.sharedService.displaySnack('Certificate created successfully');
                this.dialogRef.close("YES");
            },
            error: (err) => { console.log(err); this.sharedService.displayFirstError(err); }
        });
    }

    convertStringToEnumRepresentation(extension: string): string {
        switch (extension) {
            case 'Digital Signature': return 'DIGITAL_SIGNATURE';
            case 'Non-Repudiation': return 'NON_REPUDIATION';
            case 'Key Data Encipherment': return 'KEY_ENCIPHERMENT';
            case 'Data Encipherment': return 'DATA_ENCIPHERMENT';
            case 'Key Agreement': return 'KEY_AGREEMENT';
            case 'Certificate Signer': return 'CERTIFICATE_SIGN';
            case 'CRL Signer': return 'CRL_SIGN';
            default: return '';
        }
    }

    idk() {
        console.log(this.formGroup.value);
    }
}
