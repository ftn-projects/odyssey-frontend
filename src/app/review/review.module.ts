import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReivewManagementComponent } from './reivew-management/reivew-management.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccommodationReviewComponent } from './accommodation-review/accommodation-review.component';
import { HostReviewComponent } from './host-review/host-review.component';
import { ReviewSummaryComponent } from './review-summary/review-summary.component';
import { ReviewSectionComponent } from './review-section/review-section.component';
import { ReviewContainerComponent } from './review-container/review-container.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { GuestReviewsComponent } from './guest-reviews/guest-reviews.component';
import { HostReviewsComponent } from './host-reviews/host-reviews.component';
import { ReviewCreationComponent } from './review-creation/review-creation.component';
import { StarRatingComponent } from '../accommodation/star-rating/star-rating.component';
import { AccommodationModule } from '../accommodation/accommodation.module';
import { ReviewStarRatingComponent } from './review-star-rating/review-star-rating.component';



@NgModule({
    declarations: [
        ReivewManagementComponent,
        AccommodationReviewComponent,
        HostReviewComponent,
        ReviewSummaryComponent,
        ReviewSectionComponent,
        ReviewContainerComponent,
        ConfirmDialogComponent,
        GuestReviewsComponent,
        HostReviewsComponent,
        ReviewCreationComponent,
        ReviewStarRatingComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule
    ],
    exports: [
        HostReviewComponent,
        AccommodationReviewComponent,
        ReviewSectionComponent,
        ReviewCreationComponent,
        ReviewStarRatingComponent
    ]
})
export class ReviewModule { }
