import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationCardComponent } from './accommodation-card/accommodation-card.component';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { AccommodationListComponent } from './accommodation-list/accommodation-list.component';
import { AccommodationFilterComponent } from './accommodation-list/accommodation-filter/accommodation-filter.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { SearchDaterangePickerComponent } from './accommodation-list/search-daterange-picker/search-daterange-picker.component';
import { ButtonBarComponent } from './button-bar/button-bar.component';
import { RatingSummaryComponent } from './rating-summary/rating-summary.component';
import { ReviewCardComponent } from './review-card/review-card.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { AutocompleteDropdownComponent } from './autocomplete-dropdown/autocomplete-dropdown.component';
import { FilterDialogComponent } from './accommodation-list/filter-dialog/filter-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoundButtonComponent } from './round-button/round-button.component';
import { RouterModule } from '@angular/router';
import { AccommodationCreateComponent } from './accommodation-create/accommodation-create.component';



@NgModule({
    declarations: [
        AccommodationCardComponent,
        AccommodationListComponent,
        AccommodationFilterComponent,
        AccommodationDetailsComponent,

        ButtonBarComponent,
        StarRatingComponent,
        ReviewCardComponent,
        RoundButtonComponent,
        FilterDialogComponent,
        RatingSummaryComponent,
        AutocompleteDropdownComponent,
        SearchDaterangePickerComponent,
        AccommodationCreateComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class AccommodationModule { }
