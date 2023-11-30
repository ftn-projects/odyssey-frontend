import { Component } from '@angular/core';
import { role } from '../app.component';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
    currentRole = "UNAUTH";
    constructor() {
    }

    ngOnInit(): void {
        role.subscribe((result) => {
            this.currentRole = result.toUpperCase();
        })
    }

    get img(): string {
        return "../../../../assets/profile_example.png";
    }
}
