import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { SharedService } from '../../shared/shared.service';
import { UserService } from '../../user/user.service';
import { environment } from '../../../env/env';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
    protected role: string = '';
    protected visible: boolean = true;
    protected image: string = '../../../assets/profile_example.png';

    constructor(
        private authService: AuthService,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        this.authService.role.subscribe((role) => this.role = role);
        this.sharedService.navbarVisible.subscribe(
            (visible) => this.visible = visible
        );
        this.authService.id.subscribe((id) => this.image = `${environment.apiHost}users/image/${id}`)
    }
}

