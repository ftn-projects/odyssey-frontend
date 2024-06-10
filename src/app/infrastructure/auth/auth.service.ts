import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, map } from "rxjs";
import { AuthResponse } from './auth-response.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../env/env';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private role$ = new BehaviorSubject('');
    role = this.role$.asObservable();
    private id$ = new BehaviorSubject(-1);
    id = this.id$.asObservable();

    constructor(private keycloakService: KeycloakService) {
        this.keycloakService.keycloakEvents$.subscribe(event => {
            console.log('KEYCLOAK EVENT:', event);
            if (event.type == KeycloakEventType.OnTokenExpired)
                keycloakService.updateToken(30);
        });


        if (this.keycloakService.isLoggedIn()) {
            this.keycloakService.loadUserProfile().then(user =>
                this.login(user, this.keycloakService.getUserRoles()));
        }
    }

    getId(): any { return this.getUser()?.username; }
    getRole(): any {
        return this.getRoles()?.find((r: string) =>
            ['superadmin', 'admin', 'host', 'guest'].includes(r))?.toUpperCase();
    }
    getEmail(): any { return this.getUser()?.email; }

    isLoggedIn(): boolean {
        return this.getUser() != null;
    }

    private getUser() {
        return localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user') || '')
            : null;
    }

    private getRoles() {
        return localStorage.getItem('roles')
            ? JSON.parse(localStorage.getItem('roles') || '')
            : null;
    }

    login(user: KeycloakProfile, roles: string[]): void {
        console.log(user, roles);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('roles', JSON.stringify(roles));
        this.role$.next(this.getRole());
        this.id$.next(this.getId());
    }

    logout(): void {
        this.keycloakService.logout().then(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('roles');
            this.role$.next(this.getRole());
            this.id$.next(this.getId())
        });
    }
}
