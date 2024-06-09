import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './infrastructure/auth/auth.module';
import { UserModule } from './user/user.module';
import { AccommodationModule } from './accommodation/accommodation.module';
import { MaterialModule } from './infrastructure/material/material.module';
import { LayoutModule } from './layout/layout.module';
import { ReservationModule } from './reservation/reservation.module';
import { ReportModule } from './report/report.module';
import { NotificationModule } from './notification/notification.module';
import { WebSocketService } from './shared/web-socket.service';
import { NgxEchartsModule } from 'ngx-echarts';
import { SuperadminModule } from './superadmin/superadmin.module';
import { KeycloakBearerInterceptor, KeycloakService } from 'keycloak-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


function initializeKeycloak(keycloak: KeycloakService) {
    return () => keycloak.init({
        config: {
            url: 'https://localhost:8443',
            realm: 'Odyssey',
            clientId: 'odyssey-frontend',
        },
        initOptions: {
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri:
                window.location.origin + '/assets/silent-check-sso.html'
        },
    });
}

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        BrowserAnimationsModule,
        AccommodationModule,
        LayoutModule,
        UserModule,
        AuthModule,
        ReservationModule,
        ReportModule,
        NotificationModule,
        SuperadminModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts'),
        })

    ],
    providers: [
        provideClientHydration(),
        {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            multi: true,
            deps: [KeycloakService],
        },
        KeycloakService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: KeycloakBearerInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
