import { Component } from '@angular/core';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
    protected role = "UNAUTH";

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
