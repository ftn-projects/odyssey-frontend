import { Component, OnInit } from '@angular/core';
import { Review } from '../model/review.model';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { ReviewService } from '../review.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-host-reviews',
  templateUrl: './host-reviews.component.html',
  styleUrl: './host-reviews.component.css'
})
export class HostReviewsComponent implements OnInit  {
    id: number = 0;
    reviews?: Review[];

    constructor(
        private authServuce : AuthService,
        private reviewService : ReviewService,
        private sharedService: SharedService
    ) { }


    ngOnInit(): void {
        this.id = this.authServuce.getId();
        this.populateReviews();
    }

    populateReviews(){
        let userReviews : Review [] = [];
        this.reviewService.findAllAccommodationReviewsByHost(this.id, ['ACCEPTED']).subscribe({
            next: (data : Review[]) => {
                userReviews.push(...data);
            },
            error: (error) => {
                let errorMessage = this.sharedService.getError(error, 'Error while getting reviews');
                    this.sharedService.displaySnackWithButton(errorMessage, "OK");
            }
        });

        this.reviewService.findAllHostReviewsFiltered(this.id, null, ['ACCEPTED']).subscribe({
            next: (data : Review[]) => {
                userReviews.push(...data);
            },
            error: (error) => {
                let errorMessage = this.sharedService.getError(error, 'Error while getting reviews');
                    this.sharedService.displaySnackWithButton(errorMessage, "OK");
            }
        });
        console.log(userReviews);
        this.reviews = userReviews;
    }
}
