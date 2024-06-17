import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationCardComponent } from './accommodation-card/accommodation-card.component';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { MapComponent } from './map/map.component';
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
import { AccommodationImagesDialogComponent } from './accommodation-images-dialog/accommodation-images-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { AccommodationRequestsComponent } from './accommodation-requests/accommodation-requests.component';
import { AccommodationRequestDetailsComponent } from './accommodation-request-details/accommodation-request-details.component';
import { AccommodationRequestCreateComponent } from './accommodation-request-create/accommodation-request-create.component';
import { ReviewModule } from '../review/review.module';
import { HostAccommodationsViewComponent } from './host-accommodations-view/host-accommodations-view.component';
import { ReserveContainerComponent } from './accommodation-details/reserve-container/reserve-container.component';



@NgModule({
    declarations: [
        AccommodationCardComponent,
        AccommodationListComponent,
        AccommodationFilterComponent,
        AccommodationDetailsComponent,
        MapComponent,
        ButtonBarComponent,
        StarRatingComponent,
        ReviewCardComponent,
        RoundButtonComponent,
        FilterDialogComponent,
        RatingSummaryComponent,
        AutocompleteDropdownComponent,
        SearchDaterangePickerComponent,
        AccommodationRequestCreateComponent,
        AccommodationImagesDialogComponent,
        AccommodationRequestsComponent,
        AccommodationRequestDetailsComponent,
        HostAccommodationsViewComponent,
        ReserveContainerComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        MaterialModule,
        ReviewModule,
        ReactiveFormsModule,
        SharedModule,
        FormsModule
    ],
    exports: [
        SearchDaterangePickerComponent
    ]
})
export class AccommodationModule { }
