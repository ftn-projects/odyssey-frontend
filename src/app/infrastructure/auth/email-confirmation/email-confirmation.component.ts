import { Component } from '@angular/core';
import { UserService } from '../../../user/user.service';
import { SharedService } from '../../../shared/shared.service';

@Component({
    selector: 'app-email-confirmation',
    templateUrl: './email-confirmation.component.html',
    styleUrls: ['./email-confirmation.component.css', '../auth.style.css']
})
export class EmailConfirmationComponent {
    success: boolean = false;
    constructor(private service: UserService, private sharedService: SharedService) {
    }

    ngOnInit() {
        this.sharedService.hideNavbar();
        this.service.activateEmail("masa.ivanov04.10@gmail.com").subscribe({
            next: () => this.success = true,
            error: () => this.success = false
        });
    }
    ngOnDestroy() { this.sharedService.showNavbar(); }
}
