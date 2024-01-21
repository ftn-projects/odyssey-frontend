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
import { ReportModule } from './report/report.module';
import { NotificationModule } from './notification/notification.module';
import { WebSocketService } from './shared/web-socket.service';
import { NgxEchartsModule } from 'ngx-echarts';



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
        NgxEchartsModule.forRoot({
            /**
             * This will import all modules from echarts.
             * If you only need custom modules,
             * please refer to [Custom Build] section.
             */
            echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
          })   
        
    ],
    providers: [
        provideClientHydration(),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: Interceptor,
            multi: true
        },
        WebSocketService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
