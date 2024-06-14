import { Injectable } from '@angular/core';
import { environment } from '../../env/env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './model/user.model';
import { PasswordUpdate } from './model/password-update.model';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private path: string = environment.apiHost + 'users';

    constructor(private http: HttpClient) {
    }

    findById(id: number): Observable<User> {
        return this.http.get<User>(`${this.path}/${id}`);
    }

    getProfileImage(id: number): Observable<any> {
        return this.http.get<any>(`${this.path}/image/${id}`);
    }

    update(user: User): Observable<User> {
        return this.http.put<User>(this.path, user);
    }

    updatePassword(passwordUpdate: PasswordUpdate): Observable<PasswordUpdate> {
        return this.http.put<PasswordUpdate>(`${this.path}/password`, passwordUpdate);
    }

    deactivate(userId: number) {
        return this.http.delete(`${this.path}/deactivate/${userId}`);
    }
}
