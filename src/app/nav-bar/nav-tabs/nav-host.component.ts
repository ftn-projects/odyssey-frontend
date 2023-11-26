import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-nav-host',
    template: `
    <div class="horizontal-flex">
        <a [routerLink]="'host-reservations'">Reservations</a>
        <a [routerLink]="'host-accommodations'">My accommodations</a>
        <img class="toolbar-profile-img" [routerLink]="'account'" src="{{img}}" />
    </div>`,
    styleUrl: '../nav-bar.component.css'
})
export class NavHostComponent {
    @Input() img = "../../../../assets/profile_example.png";
}
