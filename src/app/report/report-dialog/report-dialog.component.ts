import { Component, Inject, Input } from '@angular/core';
import { ReportService } from '../report.service';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { SharedService } from '../../shared/shared.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-report-dialog',
    templateUrl: './report-dialog.component.html',
    styleUrl: './report-dialog.component.css'
})
export class ReportDialogComponent {
    @Input()
    hostId!: number;
    reportGroup: FormGroup = new FormGroup({
        description: new FormControl('', [Validators.required]),
    });

    constructor(
        private reportService: ReportService,
        private authService: AuthService,
        private sharedService: SharedService,
        private dialogRef: MatDialogRef<ReportDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data: any) {
        this.hostId = data.hostId;
    }

    submitReport() {
        this.reportService.reportUser({
            description: this.reportGroup.controls['description'].value,
            submitterId: this.authService.getId(),
            reportedId: this.hostId
        }).subscribe({
            next: () => {
                this.sharedService.displaySnack('Host reported successfully.', 4000, 'Close');
                this.closeDialog();
            },
            error: () => {
                this.sharedService.displaySnack('Something went wrong.', 4000, 'Close');
                this.closeDialog();
            }
        });
    }

    closeDialog() { this.dialogRef.close(); }
}
