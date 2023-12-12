import { Component } from '@angular/core';
import { AccountService } from '../../../user/user.service';

@Component({
    selector: 'app-email-confirmation',
    templateUrl: './email-confirmation.component.html',
    styleUrls: ['./email-confirmation.component.css', '../auth.style.css']
})
export class EmailConfirmationComponent {
    success: boolean = false;
    constructor(private service: AccountService) { }

    ngOnInit() {
        this.service.activateEmail("masa.ivanov04.10@gmail.com");
    }
}
