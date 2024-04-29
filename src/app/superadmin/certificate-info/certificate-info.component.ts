import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SharedService } from '../../shared/shared.service';
import { CertificateCreationComponent } from '../certificate-creation/certificate-creation.component';
import { SuperadminService } from '../superadmin.service';
import { Certificate, KeyUsage } from '../model/certificate.model';
import { KeyValue } from '@angular/common';

@Component({
    selector: 'app-certificate-info',
    templateUrl: './certificate-info.component.html',
    styleUrl: './certificate-info.component.css'
})
export class CertificateInfoComponent {
    constructor(
        private superadminService: SuperadminService,
        private sharedService: SharedService,
        public dialogRef: MatDialogRef<CertificateCreationComponent>,
        private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public inputData: any
    ) {
        this.certificate = inputData.cert;
        this.isCa = this.extensionsValues('Basic Constraints')?.at(0) == 'true' ?? false;
    }

    returnVal = 'NO';
    certificate!: Certificate;
    isCa = false;

    onDelete() {
        this.superadminService.deleteCertificate(this.inputData.cert.alias).subscribe({
            next: (data: any) => {
                console.log('Deleted:', data)
                this.sharedService.displaySnack('Certificates deleted successfully');
                this.dialogRef.close('YES');
            },
            error: (err) => console.log(err)
        });
    }

    onAddMore() {
        this.openDialog();
    }

    openDialog() {
        const dialogRef = this.dialog.open(CertificateCreationComponent, {
            data: { certificate: this.certificate },
        });

        dialogRef.afterClosed().subscribe(result => {
            this.returnVal = result;
            this.dialogRef.close(this.returnVal);
        });
    }

    extensionsValues(name: string): any[] | undefined {
        return this.certificate.extensions?.find(e => e.name == name)?.values;
    }

    private dnsOrder = ['CN', 'UID', 'OU', 'O', 'L', 'ST', 'C'];

    getSortedDn(items: KeyValue<unknown, unknown>[]) {
        let returnItems: KeyValue<unknown, unknown>[] = [];
        for (let ord of this.dnsOrder) {
            let ordered = [];
            for (let item of items)
                if (item.key === ord)
                    ordered.push(item);
            returnItems = returnItems.concat(ordered);
        }
        return returnItems;
    }
}
