import { Injectable } from '@angular/core';
import { environment } from '../../env/env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccommodationRequest } from './model/accommodation-request.model';
import { AccommodationRequestCreation } from './model/accommodation-request-create.model';

@Injectable({
    providedIn: 'root'
})
export class AccommodationRequestService {
    private path: string = environment.apiHost + 'accommodationRequests';
    constructor(private http: HttpClient) { }

    findByStatus(status: string): Observable<AccommodationRequest[]> {
        return this.http.get<AccommodationRequest[]>(`${this.path}?status=${status}`);
    }

    updateStatus(id: number, status: string): Observable<AccommodationRequest> {
        return this.http.put<AccommodationRequest>(`${this.path}/status/${id}?status=${status}`, null);
    }

    create(request: AccommodationRequestCreation): Observable<AccommodationRequestCreation> {
        console.log(request);
        return this.http.post<AccommodationRequestCreation>(this.path, request);
    }
}
