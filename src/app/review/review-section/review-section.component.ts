import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../model/review.model';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-review-section',
  templateUrl: './review-section.component.html',
  styleUrl: './review-section.component.css'
})
export class ReviewSectionComponent implements OnInit{
    @Input() id?: number;
    @Input() type?: string;
    reviews?: Review[];
    ratings?: number[];

    constructor(private reviewService: ReviewService){

    }

    ngOnInit(): void {
        if(this.type=="accommodation"){
            this.reviewService.findAllAccommodationReviewsFiltered(this.id, null, ["ACCEPTED"]).subscribe({
                next: (data : Review[]) => {
                    this.reviews = data;
                },
                error: (error) => {
                    console.error('Error fetching reviews:', error);
                }
            });

            this.reviewService.getAccommodationRatings(this.id).subscribe({
                next: (data : number[]) => {
                    this.ratings = data;
                },
                error: (error) => {
                    console.error('Error fetching ratings:', error);
                }
            });


        }

        else if(this.type=="host"){
            this.reviewService.findAllHostReviewsFiltered(this.id, null, ["ACCEPTED"]).subscribe({
                next: (data : Review[]) => {
                    this.reviews = data;
                },
                error: (error) => {
                    console.error('Error fetching reviews:', error);
                }
            });

            this.reviewService.getHostRatings(this.id).subscribe({
                next: (data : number[]) => {
                    this.ratings = data;
                },
                error: (error) => {
                    console.error('Error fetching ratings:', error);
                }
            });
        }
        else{
            console.log("Error: Invalid type");
        }
    }

}
