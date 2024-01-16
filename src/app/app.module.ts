import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './infrastructure/auth/auth.module';
import { UserModule } from './user/user.module';
import { AccommodationModule } from './accommodation/accommodation.module';
import { MaterialModule } from './infrastructure/material/material.module';
import { LayoutModule } from './layout/layout.module';
import { ReservationModule } from './reservation/reservation.module';
import { Interceptor } from './infrastructure/auth/interceptor';
import { ReviewModule } from './review/review.module';
import { ReportModule } from './report/report.module';
import { NotificationModule } from './notification/notification.module';


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
        ReviewModule,
        ReportModule,
        NotificationModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: Interceptor,
            multi: true
        },
        provideClientHydration()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
