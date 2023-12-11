import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { AuthResponse } from './auth-response.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../env/env';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        skip: 'true',
    });

    user$ = new BehaviorSubject("");
    userState = this.user$.asObservable();

    constructor(private http: HttpClient) {
        localStorage.clear();
        this.user$.next(this.getRole());
    }

    login(auth: any): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(environment.apiHost + 'users/login', auth, {
            headers: this.headers,
        });
    }

    logout(): Observable<string> {
        return this.http.get(environment.apiHost + 'users/logout', {
            responseType: 'text',
        });
    }

    getRole(): any {
        if (this.isLoggedIn()) {
            const accessToken: any = localStorage.getItem('user');
            const helper = new JwtHelperService();
            return helper.decodeToken(accessToken).role[0].name;
        }
        return null;
    }

    isLoggedIn(): boolean {
        let u = localStorage.getItem('user');
        return u != null && u != undefined;
    }

    setUser(): void {
        this.user$.next(this.getRole());
    }

}
