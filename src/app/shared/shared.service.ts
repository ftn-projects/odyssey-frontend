import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../infrastructure/auth/auth.service';
import { environment } from '../../env/env';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    private navbarVisible$ = new BehaviorSubject(true);
    navbarVisible = this.navbarVisible$.asObservable();

    constructor(private snackbar: MatSnackBar, private authService: AuthService) {
    }

    displaySnack(text: string, duration: number = 1000, action: string = '') {
        this.snackbar.open(text, action, { duration: duration });
    }

    displayFirstError(err: HttpErrorResponse) {
        console.log(err);
        if (!err.error) return;
        let message = Object.entries(err.error)[0][1];
        this.displayError(message);
    }

    displayError(message: any) {
        this.displaySnack(`Error: ${message}`, 5000);
    }

    showNavbar() { this.navbarVisible$.next(true); }
    hideNavbar() { this.navbarVisible$.next(false); }
}
