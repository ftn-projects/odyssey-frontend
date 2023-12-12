import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SnackMessage } from './snack/snack-message.model';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    private newSnackMessage$ = new BehaviorSubject<SnackMessage>({ text: '', duration: 0, title: '' });
    private navbarVisible$ = new BehaviorSubject(true);
    newSnackMessage = this.newSnackMessage$.asObservable();
    navbarVisible = this.navbarVisible$.asObservable();

    displaySnack(text: string, duration: number = 1000, title: string = '') {
        this.newSnackMessage$.next({ text, duration, title });
    }
    showNavbar() { this.navbarVisible$.next(true); }
    hideNavbar() { this.navbarVisible$.next(false); }
}
