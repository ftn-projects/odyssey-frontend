import { Injectable } from '@angular/core';
import { environment } from '../../env/env';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccreditReservation } from './accredit-reservation.model';
import { Reservation } from './reservation.model';

@Injectable({
    providedIn: 'root'
})
export class ReservationRequestService {
    private path: string = environment.apiHost + 'reservations';
    constructor(private http: HttpClient) { }

    findByHostId(
        id: number,
        status?: string[],
        title?: string,
        startDate?: number,
        endDate?: number): Observable<AccreditReservation[]> {
        let params = new HttpParams();
        if (status) params = params.set('status', status.join(','));
        if (title) params = params.set('title', title);
        if (startDate) params = params.set('startDate', startDate);
        if (endDate) params = params.set('endDate', endDate);

        return this.http.get<AccreditReservation[]>(`${this.path}/host/${id}`, { params });
    }

    findByGuestId(
        id: number,
        status?: string[],
        title?: string,
        startDate?: number,
        endDate?: number): Observable<AccreditReservation[]> {
        let params = new HttpParams();
        if (status) params = params.set('status', status.join(','));
        if (title) params = params.set('title', title);
        if (startDate) params = params.set('startDate', startDate);
        if (endDate) params = params.set('endDate', endDate);

        return this.http.get<AccreditReservation[]>(`${this.path}/guest/${id}`, { params });
    }

    updateStatus(id: number, status: string): Observable<Reservation> {
        return this.http.put<Reservation>(`${this.path}/status/${id}?status=${status}`, null);
    }

    accept(id: number): Observable<Reservation> {
        return this.http.put<Reservation>(`${this.path}/accept/${id}`, null);
    }
}
