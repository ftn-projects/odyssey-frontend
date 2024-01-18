import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, map } from "rxjs";
import { AuthResponse } from './auth-response.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../env/env';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        skip: 'true'
    });

    private role$ = new BehaviorSubject('');
    role = this.role$.asObservable();
    private id$ = new BehaviorSubject(-1);
    id = this.id$.asObservable();

    constructor(private http: HttpClient) {
        this.role$.next(this.getRole());
        this.id$.next(this.getId());
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

    getId(): any { return this.getToken()?.subId; }
    getRole(): any { return this.getToken()?.role[0].name; }
    getEmail(): any { return this.getToken()?.sub; }

    getToken(): any {
        if (this.isLoggedIn()) {
            const accessToken: any = localStorage.getItem('user');
            const helper = new JwtHelperService();
            return helper.decodeToken(accessToken);
        }
        return null;
    }

    isLoggedIn(): boolean {
        let u = localStorage.getItem('user');
        return u != null && u != undefined;
    }

    setUser(token: string): void {
        localStorage.setItem('user', token);
        this.role$.next(this.getRole());
        this.id$.next(this.getId());
    }

    removeUser(): void {
        localStorage.removeItem('user');
        this.role$.next(this.getRole());
        this.id$.next(this.getId());
    }
}
