import { Injectable } from '@angular/core';
import { Reservation } from './reservation.model';
import { Observable } from 'rxjs';
import { environment } from '../../env/env';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ReservationService {

    constructor(private httpClient: HttpClient) { }

    add(reservation: Reservation): Observable<Reservation> {
        return this.httpClient.post<Reservation>(environment.apiHost + 'reservations', reservation)
    }
}
