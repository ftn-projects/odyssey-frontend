import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { SharedService } from '../../shared/shared.service';
import { environment } from '../../../env/env';
import { Router } from '@angular/router';
import { NotificationService } from '../../notification/notification.service';
import { WebSocketService } from '../../shared/web-socket.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
    protected role: string = '';
    protected visible: boolean = true;
    protected image: string = '../../../assets/profile_example.png';
    protected unreadCount: number = 0;

    constructor(
        private authService: AuthService,
        private sharedService: SharedService,
        private notificationService: NotificationService,
        private webSocketService: WebSocketService,
        private router: Router) {
    }

    ngOnInit(): void {
        this.authService.role.subscribe((role) => this.role = role);
        this.sharedService.navbarVisible.subscribe(
            (visible) => this.visible = visible
        );
        this.authService.id.subscribe((id) => {
            console.log("USER ID CHANGE", id);
            this.image = `${environment.apiHost}users/image/${id}`;
            this.webSocketService.subscribe('/topic/notificationChange', id, () => {
                console.log("NOTIFICATION CHANGEEEEE!");
                this.updateUnreadCount();
            });
        });
        this.updateUnreadCount();
    }

    updateUnreadCount() {
        this.notificationService.getUnreadCount(this.authService.getId()).subscribe({
            next: (count) => {
                console.log("UPDATING");
                this.unreadCount = count;
            },
            error: (err) => console.log(err)
        });
    }

    loggedIn(): boolean { return ['ADMIN', 'HOST', 'GUEST'].includes(this.role); }

    onLogout() {
        this.authService.removeUser();
        this.router.navigate(['']);
    }
}

