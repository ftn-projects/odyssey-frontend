import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AuthModule } from './infrastructure/auth/auth.module';
import { AccountModule } from './account/account.module';
import { AccommodationModule } from './accommodation/accommodation.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from './infrastructure/material/material.module';


@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        BrowserAnimationsModule,
        AccommodationModule,
        AccountModule,
        AuthModule,
    ],
    providers: [
        provideClientHydration()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
