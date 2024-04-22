import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SharedService } from '../../shared/shared.service';
import { UserService } from '../../user/user.service';
import { CertificateCreationComponent } from '../certificate-creation/certificate-creation.component';
import { SuperadminService } from '../superadmin.service';

@Component({
  selector: 'app-certificate-info',
  templateUrl: './certificate-info.component.html',
  styleUrl: './certificate-info.component.css'
})
export class CertificateInfoComponent {
    constructor(
        private userService : UserService, 
        private superadminService : SuperadminService,
        private sharedService: SharedService,
        public dialogRef: MatDialogRef<CertificateCreationComponent>,
        private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public inputData: any
    ){}


    ngOnInit(): void {
        console.log(this.inputData);
    }

    onDelete(){
        this.superadminService.deleteCertificate(this.inputData.serialNumber).subscribe({
            next: (data: any) => {
                console.log(data);
                this.dialogRef.close();
            },
            error: (err) => console.log(err)
        });
    }

    onAddMore(){
        this.openDialog();
    }
    openDialog(){
        const dialogRef = this.dialog.open(CertificateCreationComponent, {

        });
    
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            
        });
        }
}