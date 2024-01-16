import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env/env';
import { Observable } from 'rxjs';
import { UserReportSubmission } from './model/user-report-submission.model';
import { UserWithReports } from '../user/model/user-with-reports.model';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    private path = environment.apiHost + 'reports';

    constructor(private http: HttpClient) {
    }

    getAllUsersWithReports(
        search?: string,
        roles?: string[],
        statuses?: string[],
        reported?: boolean
    ): Observable<UserWithReports[]> {
        let params = new HttpParams();
        if (search) params = params.set('search', search);
        if (roles) params = params.set('roles', roles?.join(','));
        if (statuses) params = params.set('statuses', statuses?.join(','));
        if (reported != undefined && reported != null) params = params.set('reported', reported);
        return this.http.get<UserWithReports[]>(`${this.path}/user`, { params: params });
    }

    reportUser(report: UserReportSubmission): Observable<void> {
        return this.http.post<void>(`${this.path}/user`, report);
    }

    reportReview(id: number): Observable<void> {
        return this.http.post<void>(`${this.path}/review/${id}`, {});
    }
}
