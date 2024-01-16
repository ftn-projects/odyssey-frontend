import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '../notification.service';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { Notification } from '../model/notification.model';
import { DatePipe } from '@angular/common';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';

@Component({
    selector: 'app-notification-list',
    templateUrl: './notification-list.component.html',
    styleUrl: './notification-list.component.css'
})
export class NotificationListComponent implements OnInit {
    displayedColumns: string[] = ['title', 'description', 'date', 'action'];
    dataSource: MatTableDataSource<Notification> = new MatTableDataSource();

    filterForm: FormGroup = new FormGroup({ type: new FormControl('') });
    type = new FormControl('');
    types: string[] = [];
    read: boolean = true;

    datepipe: DatePipe = new DatePipe('en-US');

    constructor(
        private notificationService: NotificationService,
        private authService: AuthService,
        private dialog: MatDialog) {
    }

    get typesInput() {
        let selected = [];
        for (let r of this.type.value!) {
            switch (r) {
                case 'Accommodation reviewed': selected.push('ACCOMMODATION_REVIEW'); break;
                case 'Profile reviewed': selected.push('HOST_REVIEW'); break;
                case 'Host reviewed': selected.push('HOST_REVIEW'); break;
                case 'Reservation made': selected.push('RESERVATION_MADE'); break;
                case 'Reservation accepted': selected.push('RESERVATION_ACCEPTED'); break;
                case 'Reservation declined': selected.push('RESERVATION_DECLINED');
            }
        }
        return selected.length > 0 ? selected : undefined;
    }

    ngOnInit() {
        switch (this.authService.getRole()) {
            case 'ADMIN':
                this.types = ['Accommodation reviewed', 'Host reviewed']; break;
            case 'HOST':
                this.types = ['Accommodation reviewed', 'Profile reviewed']; break;
            case 'GUEST':
                this.types = ['Reservation made', 'Reservation accepted', 'Reservation declined']; break;
            default: this.types = [];
        }
        this.loadData();
    }

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    loadData() {
        this.notificationService.findByUserId(
            this.authService.getId(),
            this.typesInput,
            this.read,
        ).subscribe({
            next: (data) => {
                let models: Notification[] = data.sort((a, b) => {
                    return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
                }).map(n => new Notification(n));
                this.dataSource = new MatTableDataSource(models);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: (err) => console.log(err)
        });
    }

    openNotificationDetails(notification: Notification) {
        if (!notification.read) {
            this.notificationService.updateRead(notification.id!, true).subscribe({
                next: () => console.log('Notification read!'),
                error: (err) => console.log(err)
            });
        }

        const dialogRef = this.dialog.open(NotificationDialogComponent, {
            width: '60%',
            minWidth: '300px',
            height: 'min-content',
            data: { notification: notification },
        });
        dialogRef.afterClosed().subscribe(() => {
            this.loadData();
            console.log('reloading');
        });
    }

    filtered(): boolean { return !this.read && this.typesInput == undefined; }
    changeRead(notification: Notification) {
        this.notificationService.updateRead(notification.id!, !notification.read).subscribe({
            next: () => {
                this.loadData();
                console.log(`Notification ${notification.read ? 'unread' : 'read'}!`);
            },
            error: (err) => console.log(err)
        });
    }
}
