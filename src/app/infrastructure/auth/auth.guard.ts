import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "./auth.service";


@Injectable({
    providedIn: 'root',
})
export class AuthGuard {
    constructor(private router: Router, private authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, _: RouterStateSnapshot):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const role = this.authService.getRole();

        if (!role) {
            this.router.navigate(['']);
            return false;
        }
        if (!route.data['role'].includes(role)) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }
}
