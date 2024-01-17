import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-review-star-rating',
  templateUrl: './review-star-rating.component.html',
  styleUrl: './review-star-rating.component.css'
})
export class ReviewStarRatingComponent {
    @Input() rating: number = 0;
    @Input() starCount: number = 5;
    @Output() ratingChanged = new EventEmitter<number>();

    stars: number[] = [];

    constructor() {
        this.stars = Array(this.starCount).fill(0).map((_, index) => index + 1);
    }

    onStarClick(rating: number): void {
        this.rating = rating;
        this.ratingChanged.emit(this.rating);
    }
}
