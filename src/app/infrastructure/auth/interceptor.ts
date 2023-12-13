import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private auth: AuthService) { }
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const accessToken: any = localStorage.getItem('user');

        // console.log({
        //     message: 'Intercepted request',
        //     req: request,
        //     decoded: this.auth.getToken()
        // });

        if (!request.headers.get('skip') && accessToken) {
            console.log('attaching');
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
        }
        return next.handle(request);
    }
}
