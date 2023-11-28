import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './infrastructure/material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavAdminComponent } from './nav-bar/nav-tabs/nav-admin.component';
import { NavHostComponent } from './nav-bar/nav-tabs/nav-host.component';
import { NavGuestComponent } from './nav-bar/nav-tabs/nav-guest.component';
import { NavUnauthComponent } from './nav-bar/nav-tabs/nav-unauth.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AccountComponent,
        NavBarComponent,
        NavAdminComponent,
        NavHostComponent,
        NavGuestComponent,
        NavUnauthComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule
    ],
    providers: [
        provideClientHydration()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
