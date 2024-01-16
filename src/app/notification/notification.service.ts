import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env/env';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private path = environment.apiHost + 'notifications';

    constructor(private http: HttpClient) {
    }

    findByUserId(
        userId: number,
        types?: string[],
        read?: boolean
    ): Observable<any[]> {
        let params = new HttpParams();
        if (types) params = params.set('types', types?.join(','));
        if (read != undefined && read != null) params = params.set('read', read);
        console.log(params);
        return this.http.get<any[]>(`${this.path}/user/${userId}`, { params });
    }

    updateRead(id: number, read: boolean): Observable<void> {
        return this.http.put<void>(`${this.path}/${id}/${read}`, {});
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.path}/${id}`);
    }
}
