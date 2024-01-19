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
    currentId = '';

    notificationSocket: any = null;

    constructor(
        private authService: AuthService,
        private sharedService: SharedService,
        private notificationService: NotificationService,
        private webSocketService: WebSocketService,
        private router: Router) {
    }

    getLoggedId(): string {
        return this.authService.getId();
    }

    ngOnInit(): void {
        this.authService.role.subscribe((role) => this.role = role);
        this.sharedService.navbarVisible.subscribe(
            (visible) => this.visible = visible
        );
        this.authService.id.subscribe((id) => {
            if (!id) return;

            this.image = `${environment.apiHost}users/image/${id}`;
            this.notificationSocket = this.webSocketService.subscribe(
                '/topic/notificationChange', id, () => this.updateUnreadCount());
            this.updateUnreadCount();
        });
    }

    updateUnreadCount() {
        if (!this.authService.isLoggedIn()) return;

        this.notificationService.getUnreadCount(this.authService.getId()).subscribe({
            next: (count) => {
                this.unreadCount = count;
            },
            error: (err) => console.log(err)
        });
    }

    loggedIn(): boolean { return ['ADMIN', 'HOST', 'GUEST'].includes(this.role); }

    onLogout() {
        this.authService.removeUser();
        this.notificationSocket.close();
        this.router.navigate(['']);
    }
}

