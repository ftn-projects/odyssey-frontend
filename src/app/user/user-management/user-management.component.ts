import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { UserWithReports } from '../model/user-with-reports.model';
import { ReportService } from '../../report/report.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UserReportsDialogComponent } from '../../report/user-reports-dialog/user-reports-dialog.component';

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
    displayedColumns: string[] = ['id', 'name', 'surname', 'role', 'status'];
    dataSource: MatTableDataSource<UserWithReports> = new MatTableDataSource();

    filterForm: FormGroup = new FormGroup({ search: new FormControl('') });
    role = new FormControl('');
    roles: string[] = ['Admin', 'Host', 'Guest'];
    status = new FormControl('');
    statuses: string[] = ['Pending', 'Active', 'Blocked', 'Deactivated', 'Reported'];

    constructor(private reportService: ReportService, private dialog: MatDialog) {
    }

    get searchInput() { return this.filterForm.get('search')?.value || undefined; }
    get reportedInput() { return this.status.value!.includes('Reported'); }
    get rolesInput() {
        let selected = [];
        for (let r of this.role.value!) {
            switch (r) {
                case 'Admin': selected.push('ADMIN'); break;
                case 'Host': selected.push('HOST'); break;
                case 'Guest': selected.push('GUEST');
            }
        }
        return selected.length > 0 ? selected : undefined;
    }
    get statusesInput() {
        let selected = [];
        for (let s of this.status.value!) {
            switch (s) {
                case 'Pending': selected.push('PENDING'); break;
                case 'Active': selected.push('ACTIVE'); break;
                case 'Blocked': selected.push('BLOCKED'); break;
                case 'Deactivated': selected.push('DEACTIVATED'); break;
            }
        }
        return selected.length > 0 ? selected : undefined;
    }

    ngOnInit() { this.loadData(); }

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    loadData() {
        this.reportService.getAllUsersWithReports(
            this.searchInput,
            this.rolesInput,
            this.statusesInput,
            this.reportedInput
        ).subscribe({
            next: (data) => {
                let models: UserWithReports[] = data.map(u => new UserWithReports(u));
                this.dataSource = new MatTableDataSource(models);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: (err) => console.log(err)
        });
    }

    openUserDetails(user: UserWithReports) {
        const dialogRef = this.dialog.open(UserReportsDialogComponent, {
            width: '60%',
            minWidth: '300px',
            height: 'min-content',
            data: { user: user },
        });
        dialogRef.afterClosed().subscribe(() => this.loadData());
    }

    getStatusColor(status: string): string {
        switch (status) {
            case 'PENDING': return 'yellow';
            case 'ACTIVE': return 'green';
            case 'BLOCKED': return 'red';
            default: return 'gray'; // deactivated
        }
    }
}