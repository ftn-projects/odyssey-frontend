import { Component, Input, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../user.service';
import { SharedService } from '../../shared/shared.service';
import { AuthService } from '../../infrastructure/auth/auth.service';

@Component({
    selector: 'app-notifications-management',
    templateUrl: './notifications-management.component.html',
    styleUrl: './notifications-management.component.css'
})
export class NotificationsManagementComponent implements OnInit {
    user: User = { 'address': {} };
    editedUser: User = { 'address': {} };
    role = '';

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private sharedService: SharedService
    ) {
    }

    ngOnInit() {
        this.userService.findById(this.authService.getId()).subscribe({
            next: (user) => {
                this.user = user;
                this.role = user.role!;
                this.editedUser = this.deepcopy(user);
            }
        });
    }

    deepcopy(obj: any) {
        return JSON.parse(JSON.stringify(obj));
    }

    protected settingsChanged: boolean = false;
    protected onSettingsChange() {
        let s1 = this.user.settings!;
        let s2 = this.editedUser.settings!;
        this.settingsChanged = !(
            s1.reservationRequested == s2.reservationRequested &&
            s1.reservationAccepted == s2.reservationAccepted &&
            s1.reservationDeclined == s2.reservationDeclined &&
            s1.reservationCancelled == s2.reservationCancelled &&
            s1.profileReviewed == s2.profileReviewed &&
            s1.accommodationReviewed == s2.accommodationReviewed);
    }

    protected onSave(message: string = 'Changes saved!') {
        this.userService.update(this.editedUser).subscribe({
            next: () => {
                this.sharedService.displaySnack(message);
                this.userService.findById(this.user!.id!).subscribe({
                    next: (user) => {
                        this.user = this.deepcopy(user);
                        this.editedUser = this.deepcopy(user);
                    }
                });
            },
            error: (err) => {
                this.sharedService.displayFirstError(err);
                this.userService.findById(this.user!.id!).subscribe({
                    next: (user) => {
                        this.user = this.deepcopy(user);
                        this.editedUser = this.deepcopy(user);
                    }
                });
            }
        });
    }
}
