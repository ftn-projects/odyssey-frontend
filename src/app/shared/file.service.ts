import { Injectable } from '@angular/core';
import { environment } from '../../env/env';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    constructor(private http: HttpClient) {
    }

    upload(file: File, endpoint: string, paramName: string = 'image'): Observable<HttpEvent<any>> {
        const formData = new FormData();
        formData.append(paramName, file);

        return this.http.post(endpoint, formData, {
            reportProgress: true,
            observe: 'events',
            responseType: 'text'
        });
    }
}
