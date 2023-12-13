import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    private navbarVisible$ = new BehaviorSubject(true);
    navbarVisible = this.navbarVisible$.asObservable();

    constructor(private snackbar: MatSnackBar) {
    }

    displaySnack(text: string, duration: number = 1000, action: string = '') {
        this.snackbar.open(text, action, { duration: duration });
    }

    showNavbar() { this.navbarVisible$.next(true); }
    hideNavbar() { this.navbarVisible$.next(false); }
}
