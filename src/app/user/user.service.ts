import { Injectable } from '@angular/core';
import { User } from './model/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PasswordUpdate } from './model/password-update.model';
import { environment } from '../../env/env';
import { RegisteredUser } from '../infrastructure/auth/registration/registration.model';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private path: string = environment.apiHost + 'users';

    constructor(private http: HttpClient) { }

    get(userId: number): Observable<User> {
        return this.http.get<User>(this.path + '/' + userId);
    }

    update(user: User): Observable<User> {
        return this.http.put<User>(this.path, user);
    }

    updatePassword(passwordUpdate: PasswordUpdate): Observable<PasswordUpdate> {
        return this.http.put<PasswordUpdate>(this.path + '/password', passwordUpdate);
    }

    deactivate(userId: number) {
        return this.http.delete(this.path + '/deactivate/' + userId);
    }

    block(userId: number) {
        return this.http.delete(this.path + '/block/' + userId);
    }

    add(user: RegisteredUser): Observable<RegisteredUser> {
        return this.http.post<RegisteredUser>(this.path + "/register", user);
    }

    activateEmail(email: string): Observable<Object> {
        return this.http.put(this.path + "/emailConfirmation/" + email, null);
    }
}
