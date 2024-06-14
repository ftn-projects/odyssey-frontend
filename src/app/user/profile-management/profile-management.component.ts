import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../../infrastructure/auth/auth.service';

@Component({
    selector: 'app-profile-management',
    templateUrl: './profile-management.component.html',
    styleUrl: './profile-management.component.css'
})
export class ProfileManagementComponent implements OnInit {
    user: User = { 'address': {} }

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.userService.findById(this.authService.getId()).subscribe({
                next: (user) => {
                    this.user = user;
                },
                error: (err) => console.log(err)
            });
        });
    }
}
