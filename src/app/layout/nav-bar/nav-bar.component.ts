import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { SharedService } from '../../shared/shared.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
    protected role = '';
    protected visible = true;

    constructor(
        private authService: AuthService,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        this.role = this.authService.getRole();
        this.sharedService.navbarVisible.subscribe(
            (visible) => this.visible = visible
        );
    }

    get img(): string {
        return '../../../../assets/profile_example.png';
    }
}

