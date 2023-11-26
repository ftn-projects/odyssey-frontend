import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-nav-guest',
    template: `
    <div class="horizontal-flex">
        <a [routerLink]="'guest-reservations'">My reservations</a>
        <img class="toolbar-profile-img" [routerLink]="'account'" src="{{img}}" />
    </div>`,
    styleUrl: '../nav-bar.component.css'
})
export class NavGuestComponent {
    @Input() img = "../../../../assets/profile_example.png";
}
