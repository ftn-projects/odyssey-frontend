import { Component, Inject, Input } from '@angular/core';
import { UserWithReports } from '../../user/model/user-with-reports.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../user/user.service';
import { SharedService } from '../../shared/shared.service';
import { UserReport } from '../model/user-report.model';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-user-reports-dialog',
    templateUrl: './user-reports-dialog.component.html',
    styleUrl: './user-reports-dialog.component.css'
})
export class UserReportsDialogComponent {
    @Input()
    user!: UserWithReports;

    displayedColumns: string[] = ['id', 'submitter', 'date', 'description'];
    reportsData: UserReport[] = [];

    datepipe: DatePipe = new DatePipe('en-US');

    constructor(
        private userService: UserService,
        private sharedService: SharedService,
        private dialogRef: MatDialogRef<UserReportsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data: any) {
        this.user = data.user;
        this.reportsData = data.user.reports!;
    }

    block(userId: number) {
        this.userService.block(userId).subscribe({
            next: () => {
                this.sharedService.displaySnack('User blocked successfully.');
                this.closeDialog();
            },
            error: (err) => console.log(err)
        });
    }
    activate(userId: number) {
        this.userService.activate(userId).subscribe({
            next: () => {
                this.sharedService.displaySnack('User activated successfully.');
                this.closeDialog();
            },
            error: (err) => console.log(err)
        });
    }

    closeDialog() { this.dialogRef.close(); }
}
