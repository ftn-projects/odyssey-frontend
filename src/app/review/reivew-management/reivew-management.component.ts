import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReviewService } from '../review.service';
import { ReviewRequest } from '../model/review-request.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-reivew-management',
    templateUrl: './reivew-management.component.html',
    styleUrl: './reivew-management.component.css'
})
export class ReivewManagementComponent implements OnInit {
    displayedColumns: string[] = ['id', 'title', 'submissionDate', 'type', 'title', 'host', 'select'];
    dataSource: MatTableDataSource<ReviewRequest> = new MatTableDataSource();

    filterForm: FormGroup = new FormGroup({
        search: new FormControl('')
    });
    status = new FormControl('');
    type = new FormControl('');
    statuses: string[] = ['Requested', 'Accepted', 'Declined'];
    types: string[] = ['Accommodation review', 'Host review'];


    get searchInput() { return this.filterForm.get('search')?.value || ''; }
    get statusesInput() {
        let selected = [];
        for (let s of this.status.value!) {
            switch (s) {
                case 'Requested': selected.push('REQUESTED'); break;
                case 'Accepted': selected.push('ACCEPTED'); break;
                case 'Declined': selected.push('DECLINED');
            }
        }
        return selected;
    }
    get typesInput() {
        let selected = [];
        for (let s of this.status.value!) {
            switch (s) {
                case 'Accommodation review': selected.push('ACCOMMODATION'); break;
                case 'Host': selected.push('HOST');
            }
        }
        return selected;
    }

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    requests: ReviewRequest[] = [];

    constructor(private service: ReviewService) {
    }

    ngOnInit() { this.loadData(); }

    accept(id: number) {
        this.service.accept(id).subscribe({
            next: () => this.loadData(),
            error: (err) => console.log(err)
        });
    }

    decline(id: number) {
        this.service.decline(id).subscribe({
            next: () => this.loadData(),
            error: (err) => console.log(err)
        });
    }

    loadData() {
        this.service.findAll(
            this.searchInput,
            this.typesInput,
            this.statusesInput
        ).subscribe({
            next: (data: ReviewRequest[]) => {
                this.requests = data;
                this.dataSource = new MatTableDataSource(this.requests);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: (err) => console.log(err)
        });
    }
}
