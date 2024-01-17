import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../model/review.model';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-guest-reviews',
  templateUrl: './guest-reviews.component.html',
  styleUrl: './guest-reviews.component.css'
})
export class GuestReviewsComponent implements OnInit {
    id: number = 0;
    reviews?: Review[];

    constructor(
        private authServuce : AuthService,
        private reviewService : ReviewService
    ) { }


    ngOnInit(): void {
        this.id = this.authServuce.getId();
        this.populateReviews();
    }

    populateReviews(){
        let userReviews : Review [] = [];
        this.reviewService.findAllAccommodationReviewsFiltered(null, this.id, ['ACCEPTED']).subscribe({
            next: (data : Review[]) => {
                userReviews.push(...data);
            },
            error: (error) => {
                console.error('Error fetching reviews:', error);
            }
        });

        this.reviewService.findAllHostReviewsFiltered(null, this.id, ['ACCEPTED']).subscribe({
            next: (data : Review[]) => {
                userReviews.push(...data);
            },
            error: (error) => {
                console.error('Error fetching reviews:', error);
            }
        });

        this.reviews = userReviews;
    }

}
