import { Component, OnInit } from '@angular/core';
import { Review } from '../model/review.model';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { ReviewService } from '../review.service';

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
        private reviewService : ReviewService
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
                console.error('Error fetching reviews:', error);
            }
        });

        this.reviewService.findAllHostReviewsFiltered(this.id, null, ['ACCEPTED']).subscribe({
            next: (data : Review[]) => {
                userReviews.push(...data);
            },
            error: (error) => {
                console.error('Error fetching reviews:', error);
            }
        });
        console.log(userReviews);
        this.reviews = userReviews;
    }
}
