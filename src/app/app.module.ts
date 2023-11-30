import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './infrastructure/material/material.module';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccommodationCardComponent } from './accommodation-card/accommodation-card.component';
import { AccommodationListComponent } from './accommodation-list/accommodation-list.component';
import { AccountComponent } from './account/account.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './authentification/login/login.component';
import { RegistrationComponent } from './authentification/registration/registration.component';
import { ButtonBarComponent } from './button-bar/button-bar.component';
import { RoundButtonComponent } from './round-button/round-button.component';
import { AccommodationFilterComponent } from './accommodation-list/accommodation-filter/accommodation-filter.component';
import { FilterDialogComponent } from './accommodation-list/filter-dialog/filter-dialog.component';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { ReviewCardComponent } from './review-card/review-card.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { RatingSummaryComponent } from './rating-summary/rating-summary.component';
import { AutocompleteDropdownComponent } from './autocomplete-dropdown/autocomplete-dropdown.component';
import { SearchDaterangePickerComponent } from './accommodation-list/search-daterange-picker/search-daterange-picker.component';

@NgModule({
    declarations: [
        AppComponent,
        AccommodationCardComponent,
        AccommodationListComponent,
        AccountComponent,
        NavBarComponent,
        LoginComponent,
        RegistrationComponent,
        ButtonBarComponent,
        RoundButtonComponent,
        AccommodationFilterComponent,
        FilterDialogComponent,
        SearchDaterangePickerComponent,
        AccommodationDetailsComponent,
        ReviewCardComponent,
        StarRatingComponent,
        RatingSummaryComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        AutocompleteDropdownComponent
    ],
    providers: [
        provideClientHydration()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
