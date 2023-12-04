import { Component, OnInit } from '@angular/core';
import { displayNav, role } from '../app.component';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
    currentRole = "UNAUTH";
    displayed = true;

    ngOnInit(): void {
        role.subscribe((result) => {
            this.currentRole = result.toUpperCase();
        })
        displayNav.subscribe((result) => {
            this.displayed = result;
        })
    }

    get img(): string {
        return "../../../../assets/profile_example.png";
    }
}
