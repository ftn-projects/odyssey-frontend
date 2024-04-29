import { Component, ViewChild } from '@angular/core';
import { CertificateRequest, CertificateStatus } from '../model/certificate-request.model';
import { SuperadminService } from '../superadmin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SharedService } from '../../shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { CertificateCreationComponent } from '../certificate-creation/certificate-creation.component';


@Component({
    selector: 'app-certificate-requests-page',
    templateUrl: './certificate-requests-page.component.html',
    styleUrl: './certificate-requests-page.component.css'
})
export class CertificateRequestsPageComponent {
    certificateStatus = CertificateStatus;
    constructor(
        private service: SuperadminService,
        private sharedService: SharedService,
        public dialog: MatDialog
    ) { }
    requests: CertificateRequest[] = [];
    displayedColumns: string[] = ['id', 'commonName', 'email', 'uid', 'date', 'status', 'select'];

    dataSource: MatTableDataSource<CertificateRequest> = new MatTableDataSource();

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    loadData() {
        this.service.getAll().subscribe({
            next: (data: CertificateRequest[]) => {
                this.requests = data;
                this.dataSource = new MatTableDataSource(this.requests);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: (err) => console.log(err)
        });
    }

    ngOnInit() {
        this.loadData();
    }

    approveRequest(request: CertificateRequest) {
        this.openDialog(request);
    }

    declineRequest(id: number) {
        this.service.declineRequest(id).subscribe({
            next: (_: CertificateRequest) => {
                this.loadData();
                this.sharedService.displaySnack("Request declined");
            },
            error: (err) => this.sharedService.displayFirstError(err)
        });
    }

    sendApproval(id: number) {
        this.service.approveRequest(id).subscribe({
            next: (_: CertificateRequest) => {
                this.loadData();
                this.sharedService.displaySnack("Request approved");
            },
            error: (err) => this.sharedService.displayFirstError(err)
        });
    }

    openDialog(certRequest: CertificateRequest) {
        const dialogRef = this.dialog.open(CertificateCreationComponent, {
            data: { request: certRequest },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result == "YES") {
                this.sendApproval(certRequest.id!);
            }
        });
    }
}
