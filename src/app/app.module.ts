import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './infrastructure/material/material.module';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AccommodationCardComponent } from './accommodation-card/accommodation-card.component';
import { AccommodationListComponent } from './accommodation-list/accommodation-list.component';
import { AccountComponent } from './account/account.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavAdminComponent } from './nav-bar/nav-tabs/nav-admin.component';
import { NavHostComponent } from './nav-bar/nav-tabs/nav-host.component';
import { NavGuestComponent } from './nav-bar/nav-tabs/nav-guest.component';
import { NavUnauthComponent } from './nav-bar/nav-tabs/nav-unauth.component';
import { LoginComponent } from './authentification/login/login.component';
import { RegistrationComponent } from './authentification/registration/registration.component';
import { ButtonBarComponent } from './button-bar/button-bar.component';
import { RoundButtonComponent } from './round-button/round-button.component';
import { AccommodationFilterComponent } from './accommodation-list/accommodation-filter/accommodation-filter.component';
import { FilterDialogComponent } from './accommodation-list/filter-dialog/filter-dialog.component';
import { SearchDaterangePickerComponent } from './accommodation-list/search-daterange-picker/search-daterange-picker.component';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { ReviewCardComponent } from './review-card/review-card.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AccommodationCardComponent,
        AccommodationListComponent,
        AccountComponent,
        NavBarComponent,
        NavAdminComponent,
        NavHostComponent,
        NavGuestComponent,
        NavUnauthComponent,
        LoginComponent,
        RegistrationComponent,
        ButtonBarComponent,
        RoundButtonComponent,
        AccommodationFilterComponent,
        FilterDialogComponent,
        SearchDaterangePickerComponent,
        AccommodationDetailsComponent,
        ReviewCardComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule
    ],
    providers: [
        provideClientHydration()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
