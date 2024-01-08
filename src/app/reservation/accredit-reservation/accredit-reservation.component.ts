import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ReservationRequestService } from '../reservation-request.service';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { AccreditReservation } from '../accredit-reservation.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-accredit-reservation',
    templateUrl: './accredit-reservation.component.html',
    styleUrl: './accredit-reservation.component.css'
})
export class AccreditReservationComponent {
    displayedColumns: string[] = ['id', 'price', 'guest', 'cancellation', 'date', 'status', 'startDate', 'endDate', 'accommodation', 'select'];
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
    get startInput() { return this.filterForm.get('start')?.value.getTime; }
    get endInput() { return this.filterForm.get('end')?.value.getTime; }


    constructor(private service: ReservationRequestService, private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
        this.loadData();
    }

    approveRequest(id: number, isApprove: boolean) {
        let status = isApprove ? "ACCEPTED" : "DECLINED";
        this.service.updateStatus(id, status).subscribe({
            next: () => this.loadData()
        });
    }

    loadData() {
        this.service.findByHostId(this.authService.getId()).subscribe({
            next: (data: AccreditReservation[]) => {
                console.log(data);
                this.requests = data;
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



        this.service.findByHostId(this.authService.getId(), this.selected, this.titleInput, this.startInput, this.endInput).subscribe({
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
