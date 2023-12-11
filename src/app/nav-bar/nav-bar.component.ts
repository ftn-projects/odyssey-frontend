import { Component, OnInit } from '@angular/core';
import { displayNav, role } from '../app.component';
import { AuthService } from '../infrastructure/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) {
    }

    role = "";
    displayed = true;

    ngOnInit(): void {
        this.authService.userState.subscribe((result) => {
            this.role = result;
        })
    }

    logOut(): void {
        this.authService.logout().subscribe({
            next: (_) => {
                localStorage.removeItem('user');
                this.authService.setUser();
                this.router.navigate(['login']);
            }
        })
    }
    get img(): string {
        return "../../../../assets/profile_example.png";
    }
}

