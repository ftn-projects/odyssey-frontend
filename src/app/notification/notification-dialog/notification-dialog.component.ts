import { Component, Inject, Input } from '@angular/core';
import { Notification } from '../model/notification.model';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../shared/shared.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../notification.service';

@Component({
    selector: 'app-notification-dialog',
    templateUrl: './notification-dialog.component.html',
    styleUrl: './notification-dialog.component.css'
})
export class NotificationDialogComponent {
    @Input()
    notification!: Notification;

    datepipe: DatePipe = new DatePipe('en-US');

    constructor(
        private notificationService: NotificationService,
        private sharedService: SharedService,
        private dialogRef: MatDialogRef<NotificationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data: any) {
        console.log(data.notification);
        this.notification = data.notification;
    }

    delete() {
        this.notificationService.delete(this.notification.id!).subscribe({
            next: () => {
                this.sharedService.displaySnack('Notification deleted.');
                this.closeDialog();
            },
            error: (err) => console.log(err)
        });
    }
    closeDialog() { this.dialogRef.close(); }
}
