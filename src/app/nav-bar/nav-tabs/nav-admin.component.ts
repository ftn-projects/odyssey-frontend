import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-nav-admin',
    template: `
    <div class="horizontal-flex">
        <a [routerLink]="'admin-reviews'">Reviews</a>
        <a [routerLink]="'admin-accommodations'">Accommodations</a>
        <a [routerLink]="'admin-users'">Users</a>
        <img class="toolbar-profile-img" [routerLink]="'account'" src="{{img}}" />
    </div>`,
    styleUrl: '../nav-bar.component.css'
})
export class NavAdminComponent {
    @Input() img = "../../../../assets/profile_example.png";
}
