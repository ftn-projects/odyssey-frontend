import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AccommodationRequest } from '../model/accommodation-request.model';
import { AccommodationRequestService } from '../accommodation-request.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-accommodation-requests',
    templateUrl: './accommodation-requests.component.html',
    styleUrl: './accommodation-requests.component.css'
})
export class AccommodationRequestsComponent {
    displayedColumns: string[] = ['id', 'submissionDate', 'type', 'title', 'host', 'select'];
    dataSource: MatTableDataSource<AccommodationRequest> = new MatTableDataSource();

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    requests: AccommodationRequest[] = [];

    constructor(private service: AccommodationRequestService, private router: Router) {
    }

    ngOnInit() {
        this.loadData();
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    approveRequest(id: number, isApprove: boolean) {
        let status = isApprove ? "ACCEPTED" : "DECLINED";
        this.service.updateStatus(id, status).subscribe({
            next: () => this.loadData()
        });
    }

    loadData() {
        this.service.findByStatus("REQUESTED").subscribe({
            next: (data: AccommodationRequest[]) => {
                this.requests = data;
                this.dataSource = new MatTableDataSource(this.requests);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: (err) => console.log(err)
        });
    }

    onRequestClick(request: AccommodationRequest) {
        this.router.navigate([`/accommodationReview/${request.id}`])
    }
}
