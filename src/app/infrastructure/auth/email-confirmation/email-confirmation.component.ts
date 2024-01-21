import { Component } from '@angular/core';
import { UserService } from '../../../user/user.service';
import { SharedService } from '../../../shared/shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-email-confirmation',
    templateUrl: './email-confirmation.component.html',
    styleUrls: ['./email-confirmation.component.css', '../auth.style.css']
})
export class EmailConfirmationComponent {
    success: boolean = false;
    constructor(
        private service: UserService,
        private route: ActivatedRoute,
        private sharedService: SharedService) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            console.log(params)
            let id = params['id'];

            this.service.activateEmail(id).subscribe({
                next: () => this.success = true,
                error: () => this.success = false
            });
        });
        this.sharedService.hideNavbar();
    }
    ngOnDestroy() { this.sharedService.showNavbar(); }
}
