import { Injectable } from '@angular/core';
import { User } from './model/user.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PasswordUpdate } from './model/password-update.model';
import { environment } from '../../env/env';
import { RegisteredUser } from '../infrastructure/auth/registration/registration.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
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

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(this.path);
    }

    updatePassword(passwordUpdate: PasswordUpdate): Observable<PasswordUpdate> {
        console.log(passwordUpdate);
        return this.http.put<PasswordUpdate>(`${this.path}/password`, passwordUpdate);
    }

    deactivate(userId: number) {
        return this.http.delete(`${this.path}/deactivate/${userId}`);
    }

    block(userId: number) {
        return this.http.delete(`${this.path}/block/${userId}`);
    }

    activate(userId: number) {
        return this.http.put(`${this.path}/activate/${userId}`, {});
    }

    add(user: RegisteredUser): Observable<RegisteredUser> {
        return this.http.post<RegisteredUser>(`http://localhost:8080/api/v1/users/register`, user);
    }

    activateEmail(id: number): Observable<string> {
        return this.http.post<string>(`${this.path}/confirmEmail/${id}`, null);
    }
}
