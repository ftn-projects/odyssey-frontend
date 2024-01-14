import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env/env';
import { Observable } from 'rxjs';
import { UserReportSubmission } from './model/user-report-submission.model';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    private path = environment.apiHost + 'reports';

    constructor(private http: HttpClient) {
    }

    reportUser(report: UserReportSubmission): Observable<void> {
        console.log(report);
        return this.http.post<void>(`${this.path}/user`, report);
    }

    reportReview(id: number): Observable<void> {
        return this.http.post<void>(`${this.path}/review/${id}`, {});
    }
}
