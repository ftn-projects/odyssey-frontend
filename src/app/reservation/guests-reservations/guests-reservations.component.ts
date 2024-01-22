import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AccreditReservation } from '../accredit-reservation.model';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ReservationRequestService } from '../reservation-request.service';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-guests-reservations',
    templateUrl: './guests-reservations.component.html',
    styleUrl: './guests-reservations.component.css'
})
export class GuestsReservationsComponent {
    displayedColumns: string[] = ['id', 'price', 'guestNumber', 'host', 'date', 'status', 'startDate', 'endDate', 'accommodation', 'select'];
    dataSource: MatTableDataSource<AccreditReservation> = new MatTableDataSource();

    status = new FormControl('');
    statuses: string[] = ['Requested', 'Accepted', 'Declined', 'Cancelled request', 'Cancelled reservation'];

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    requests: AccreditReservation[] = [];

    filterForm: FormGroup = new FormGroup({
        title: new FormControl(''),
        start: new FormControl(''),
        end: new FormControl('')
    });

    get titleInput() { return this.filterForm.get('title')?.value; }
    get startInput() { return this.filterForm.get('start')?.value.getTime(); }
    get endInput() { return this.filterForm.get('end')?.value.getTime(); }

    datePipe = new DatePipe('en-US');

    constructor(private service: ReservationRequestService, private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
        this.loadData();
    }

    cancelRequest(id: number, statusBefore: string) {
        let status = statusBefore == "REQUESTED" ? "CANCELLED_REQUEST" : "CANCELLED_RESERVATION";
        this.service.updateStatus(id, status).subscribe({
            next: () => this.loadData()
        });
    }

    allowCancel(start: Date, cancellationDue: number, statusBefore: string): boolean {
        if (statusBefore == "REQUESTED") return true;

        let cancelBy = new Date(start);
        cancelBy.setDate(cancelBy.getDate() - cancellationDue);
        return new Date(Date.now()) <= cancelBy;
    }

    getCancelBy(start: Date, cancellationDue: number): String {
        const cancelBy = new Date(start);
        cancelBy.setDate(cancelBy.getDate() - cancellationDue)
        const day = cancelBy.getDate().toString().padStart(2, '0');
        const month = (cancelBy.getMonth() + 1).toString().padStart(2, '0');
        const year = cancelBy.getFullYear();

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    loadData() {
        this.service.findByGuestId(this.authService.getId()).subscribe({
            next: (data: AccreditReservation[]) => {
                this.requests = data.map(r => {
                    r.start = new Date(r.start!);
                    r.end = new Date(r.end!);
                    r.requestDate = new Date(r.requestDate!);
                    return r;
                });
                console.log(this.requests);
                this.dataSource = new MatTableDataSource(this.requests);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: (err) => console.log(err)
        });
    }

    selected: string[] = [];
    searchAndFilter(): void {
        this.selected = [];
        for (let s of this.status.value!) {
            switch (s) {
                case 'Accepted': { this.selected.push('ACCEPTED'); break; }
                case 'Requested': { this.selected.push('REQUESTED'); break; }
                case 'Declined': { this.selected.push('DECLINED'); break; }
                case 'Cancelled request': { this.selected.push('CANCELLED_REQUEST'); break; }
                case 'Cancelled reservation': { this.selected.push('CANCELLED_RESERVATION'); break; }
            }
        }



        this.service.findByGuestId(this.authService.getId(), this.selected, this.titleInput, this.startInput, this.endInput).subscribe({
            next: (data: AccreditReservation[]) => {
                this.requests = data;
                this.dataSource = new MatTableDataSource(this.requests);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: (err) => console.log(err)
        });
    }

}