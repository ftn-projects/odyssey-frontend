import { Component } from '@angular/core';
import { NavUnauthComponent } from './nav-tabs/nav-unauth.component';
import { NavGuestComponent } from './nav-tabs/nav-guest.component';
import { NavHostComponent } from './nav-tabs/nav-host.component';
import { NavAdminComponent } from './nav-tabs/nav-admin.component';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
    protected role = "HOST";

    get navTabs() {
        switch (this.role) {
            case "GUEST":
                return NavGuestComponent;
            case "HOST":
                return NavHostComponent;
            case "ADMIN":
                return NavAdminComponent;
            default:
                return NavUnauthComponent;
        }
    }

    get img(): string {
        switch (this.role) {
            case "GUEST":
                return "../../../../assets/profile_example.png";
            case "HOST":
                return "../../../../assets/profile_example.png";
            case "ADMIN":
                return "../../../../assets/profile_example.png";
            default:
                return "";
        }
    }
}
