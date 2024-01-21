import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-review-summary',
  templateUrl: './review-summary.component.html',
  styleUrl: './review-summary.component.css'
})
export class ReviewSummaryComponent{
    @Input() ratings?: number[];
    totalRating: number = 0;
    averageRating: number = 0;
    ratingPercentages: number[] = [];


    totalReviews(): number {
        return this.ratings?.reduce((sum, rating) => sum + rating, 0) || 0;
    }

    calculateAverageRating(): void { 
        if(!this.ratings) return;
        let totalStars = 0;
        for (let i = 0; i < this.ratings?.length; i++) {
            totalStars += this.ratings[i] * (i+1);
        }

        for (let i = 0; i < this.ratings?.length; i++) {
            this.ratingPercentages.push(this.ratings[i] / this.totalReviews() * 100);
        }
        if(this.totalReviews() == 0) this.averageRating=0;
        else this.averageRating = totalStars / this.totalReviews();        
    }


    ngOnChanges(changes: SimpleChanges): void {
        if (this.ratings) {
            this.calculateAverageRating();
        }
    }

}
