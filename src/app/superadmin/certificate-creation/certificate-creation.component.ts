import { Component, Inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormField } from '@angular/material/form-field';
import { User } from '../../user/model/user.model';
import { Certificate, Extension } from '../model/certificate.mode';
import { UserService } from '../../user/user.service';
import { SuperadminService } from '../superadmin.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../review/confirm-dialog/confirm-dialog.component';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchDaterangePickerComponent } from '../../accommodation/accommodation-list/search-daterange-picker/search-daterange-picker.component';
import { ExtensionMapper } from '../model/certificate.mode';
import { SharedService } from '../../shared/shared.service';

@Component({
    selector: 'app-certificate-creation',
    templateUrl: './certificate-creation.component.html',
    styleUrl: './certificate-creation.component.css'
})
export class CertificateCreationComponent {
    selectedUser?: User;
    selectedCertificate: any;

    InputUser?: User;
    allUsers: User[] = [];
    allCertificates: any[] = [];
    formGroup = new FormGroup({
        userControl: new FormControl(),
        certControl: new FormControl(),
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
            if (ext === 'BASIC_CONSTRAINTS')
                extensionsMap.set(ext, ['true']);
            else extensionsMap.set(ext, []);
        });
        const newMap: Record<string, string[]> = {};
        extensionsMap.forEach((val: string[], key: string) => {
            newMap[key] = val;
        });
        // Create the certificate object
        let certificate = {
            parentAlias: this.getSelectedCertificate?.serialNumber,
            commonName: this.getSelectedUser?.name + ' ' + this.getSelectedUser?.surname,
            email: this.getSelectedUser?.email,
            uid: this.getSelectedUser?.id,
            startDate: this.getStartedDate.getTime(),
            endDate: this.getEndDate.getTime(),
            extensions: newMap
        };

        console.log("Certificate: ", certificate);

        this.superadminService.sendCertificate(certificate).subscribe({
            next: (data: Certificate) => {
                this.sharedService.displaySnack('Certificate created successfully');
                this.dialogRef.close("YES");
            },
            error: (err) => { console.log(err); this.sharedService.displayFirstError(err); }
        });
    }

    convertStringToEnumRepresentation(extension: string): string {
        switch (extension) {
            case 'Basic Constraints': return 'BASIC_CONSTRAINTS';
            case 'Key Usage': return 'KEY_USAGE';
            case 'Subject Key Identifier': return 'SUBJECT_KEY_IDENTIFIER';
            case 'Authority Key Identifier': return 'AUTHORITY_KEY_IDENTIFIER';
            default: return '';
        }
    }

    idk() {
        console.log(this.formGroup.value);
    }

}
