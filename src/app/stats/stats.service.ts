import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env/env';
import { Observable } from 'rxjs';
import { TotalStats } from './model/total-stats.model';
import { AccommodationTotalStats } from './model/accommodation-total-stats.model';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

    private path = environment.apiHost + 'accommodations/stats';
  constructor(
    private httpClient : HttpClient
  ) { }

    getForAccommodation(id? : number | null, start? : number | null, end? : number | null) : Observable<AccommodationTotalStats>{
        let params = new HttpParams();
        if(start) params = params.set('startDate', start);
        if(end) params = params.set('end', end);
        return this.httpClient.get(this.path + `/accommodation/${id}`, {params});
    }

    getForHost(id? : number | null, start? : number | null, end? : number | null) : Observable<TotalStats>{
        let params = new HttpParams();
        if(start) params = params.set('startDate', start);
        if(end) params = params.set('endDate', end);
        return this.httpClient.get(this.path + `/host/${id}`, {params});
    }

    getAllAccommodationsForHost(id? : number | null, start? : number | null, end? : number | null) : Observable<AccommodationTotalStats[]>{
        let params = new HttpParams();
        if(start) params = params.set('startDate', start);
        if(end) params = params.set('endDate', end);
        return this.httpClient.get<AccommodationTotalStats[]>(this.path + `/host/${id}/all`, {params});
    }
}
