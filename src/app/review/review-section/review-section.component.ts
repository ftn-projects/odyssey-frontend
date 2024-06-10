import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../model/review.model';
import { ReviewService } from '../review.service';
import { SharedService } from '../../shared/shared.service';

@Component({
    selector: 'app-review-section',
    templateUrl: './review-section.component.html',
    styleUrl: './review-section.component.css'
})
export class ReviewSectionComponent implements OnInit {
    @Input() id?: number;
    @Input() type?: string;
    reviews?: Review[];
    ratings?: number[];

    constructor(private reviewService: ReviewService, private sharedService: SharedService) {

    }

    ngOnInit(): void {
        if (this.type == "accommodation") {
            this.reviewService.findAllAccommodationReviewsFiltered(this.id, null, ["ACCEPTED"]).subscribe({
                next: (data: Review[]) => {
                    this.reviews = data;
                },
                error: (error) => {
                    let errorMessage = this.sharedService.getError(error, 'Error while getting reviews');
                    console.log(errorMessage);
                    // this.sharedService.displaySnackWithButton(errorMessage, "OK");
                }
            });

            this.reviewService.getAccommodationRatings(this.id).subscribe({
                next: (data: number[]) => {
                    this.ratings = data;
                },
                error: (error) => {
                    let errorMessage = this.sharedService.getError(error, 'Error while getting reviews');
                    console.log(errorMessage);
                    // this.sharedService.displaySnackWithButton(errorMessage, "OK");
                }
            });


        }

        else if (this.type == "host") {
            this.reviewService.findAllHostReviewsFiltered(this.id, null, ["ACCEPTED"]).subscribe({
                next: (data: Review[]) => {
                    this.reviews = data;
                },
                error: (error) => {
                    let errorMessage = this.sharedService.getError(error, 'Error while getting reviews');
                    console.log(errorMessage);
                    // this.sharedService.displaySnackWithButton(errorMessage, "OK");
                }
            });

            this.reviewService.getHostRatings(this.id).subscribe({
                next: (data: number[]) => {
                    this.ratings = data;
                },
                error: (error) => {
                    let errorMessage = this.sharedService.getError(error, 'Error while getting reviews');
                    console.log(errorMessage);
                    // this.sharedService.displaySnackWithButton(errorMessage, "OK");
                }
            });
        }
        else {
            console.log("Error: Invalid type");
        }
    }

}
