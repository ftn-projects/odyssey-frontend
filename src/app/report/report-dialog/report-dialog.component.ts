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
    reportedId!: number;
    reportGroup: FormGroup = new FormGroup({
        description: new FormControl('', [Validators.required]),
    });

    constructor(
        private reportService: ReportService,
        private authService: AuthService,
        private sharedService: SharedService,
        private dialogRef: MatDialogRef<ReportDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data: any) {
        this.reportedId = data.reportedId;
    }

    submitReport() {
        if (!this.reportGroup.valid) {
            this.sharedService.displaySnackWithButton('Please provide the description.', 'OK');
            return;
        }

        this.reportService.reportUser({
            description: this.reportGroup.controls['description'].value,
            submitterId: this.authService.getId(),
            reportedId: this.reportedId
        }).subscribe({
            next: () => {
                this.sharedService.displaySnack('User successfully reported.', 4000, 'Close');
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
