import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from './model/review.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../env/env';
import { AccommodationReview } from './model/accommodationReview.model';
import { HostReview } from './model/hostReview.model';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    private path = environment.apiHost + 'reviews';

    constructor(private http: HttpClient) {
    }

    findAll(search?: string, types?: string[], statuses?: string[]): Observable<Review[]> {
        let params = new HttpParams();
        if (search) params = params.set('search', search);
        if (types) params = params.set('types', types?.join(','));
        if (statuses) params = params.set('statuses', statuses?.join(','));
        return this.http.get<Review[]>(this.path, { params });
    }

    findAllAccommodationReviewsFiltered(accommodationId?: number | null, submitterId?: number | null, statuses?: string[] | null): Observable<AccommodationReview[]> {
        let params = new HttpParams();
        if (accommodationId) params = params.set('accommodationId', accommodationId.toString());
        if (submitterId) params = params.set('submitterId', submitterId.toString());
        if (statuses) params = params.set('listTypes', statuses?.join(','));
        return this.http.get<AccommodationReview[]>(this.path + '/accommodation', { params });
    }

    findAllHostReviewsFiltered(hostId?: number | null, submitterId?: number | null, statuses?: string[] | null): Observable<HostReview[]> {
        let params = new HttpParams();
        if (hostId) params = params.set('hostId', hostId.toString());
        if (submitterId) params = params.set('submitterId', submitterId.toString());
        if (statuses) params = params.set('listTypes', statuses?.join(','));
        return this.http.get<HostReview[]>(this.path + '/host', { params });
    }

    findAllAccommodationReviewsByHost(hostId?: number | null, statuses?: string[] | null): Observable<AccommodationReview[]> {
        let params = new HttpParams();
        if (statuses) params = params.set('listTypes', statuses?.join(','));
        return this.http.get<AccommodationReview[]>(`${this.path}/accommodation/host/${hostId}`, { params });
    }

    getAccommodationRatings(id?: number): Observable<number[]> {
        return this.http.get<number[]>(`${this.path}/accommodation/rating/${id}`);
    }

    getHostRatings(id?: number): Observable<number[]> {
        return this.http.get<number[]>(`${this.path}/host/rating/${id}`);
    }

    reportAccommodationReview(id?: number): Observable<void> {
        return this.http.put<void>(`${this.path}/accommodation/report/${id}`, {});
    }

    reportHostReview(id?: number): Observable<void> {
        return this.http.put<void>(`${this.path}/host/report/${id}`, {});
    }

    deleteAccommodationReview(id?: number): Observable<void> {
        return this.http.delete<void>(`${this.path}/accommodation/${id}`);
    }

    deleteHostReview(id?: number): Observable<void> {
        return this.http.delete<void>(`${this.path}/host/${id}`);
    }

    accept(id: number): Observable<void> {
        return this.http.put<void>(`${this.path}/accept/${id}`, {});
    }

    decline(id: number): Observable<void> {
        return this.http.put<void>(`${this.path}/decline/${id}`, {});
    }

    dismiss(id: number): Observable<void> {
        return this.http.put<void>(`${this.path}/dismiss/${id}`, {});
    }

    createAccommodationReview(review: AccommodationReview): Observable<AccommodationReview> {
        return this.http.post<AccommodationReview>(`${this.path}/accommodation`, review);
    }

    createHostReview(review: HostReview): Observable<HostReview> {
        return this.http.post<HostReview>(`${this.path}/host`, review);
    }
}
