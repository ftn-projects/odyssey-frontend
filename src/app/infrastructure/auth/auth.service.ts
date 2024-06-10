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
    private user: any | null;
    private roles: string[] = [];

    private role$ = new BehaviorSubject('');
    role = this.role$.asObservable();
    private id$ = new BehaviorSubject(-1);
    id = this.id$.asObservable();

    constructor(private keycloakService: KeycloakService) {
        this.keycloakService.keycloakEvents$.subscribe(event => {
            console.log('KEYCLOAK EVENT:', event);
        });


        if (this.keycloakService.isLoggedIn()) {
            this.keycloakService.loadUserProfile().then(user =>
                this.login(user, keycloakService.getUserRoles()));
        }
    }

    getId(): any { return this.user.username; }
    getRole(): any {
        return this.roles.find((r: string) =>
            ['superadmin', 'admin', 'host', 'guest'].includes(r))?.toUpperCase();
    }
    getEmail(): any { return this.user.email; }

    isLoggedIn(): boolean {
        return this.user != null;
    }

    login(user: KeycloakProfile, roles: string[]): void {
        console.log(user, roles);
        this.user = user;
        this.roles = roles;
        this.role$.next(this.getRole());
        this.id$.next(this.getId());
    }

    logout(): void {
        this.keycloakService.logout().then(() => {
            this.user = null;
            this.roles = []
            this.role$.next(this.getRole());
            this.id$.next(this.getId())
        });
    }
}
