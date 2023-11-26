import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-nav-unauth',
    template: `
        <a [routerLink]="'login'">Log in</a>
        <a [routerLink]="'signup'">Sign up</a>
    `,
    styleUrl: '../nav-bar.component.css'
})
export class NavUnauthComponent {
    @Input("img") _ = ""
}
