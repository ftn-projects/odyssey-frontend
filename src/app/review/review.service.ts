import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from './model/review.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../env/env';

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

    accept(id: number): Observable<void> {
        return this.http.put<void>(`${this.path}/accept/${id}`, {});
    }

    decline(id: number): Observable<void> {
        return this.http.put<void>(`${this.path}/decline/${id}`, {});
    }
}
