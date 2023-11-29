import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-summary',
  templateUrl: './rating-summary.component.html',
  styleUrl: './rating-summary.component.css'
})
export class RatingSummaryComponent {
    @Input() fiveStarCount: number = 0;
  @Input() fourStarCount: number = 0;
  @Input() threeStarCount: number = 0;
  @Input() twoStarCount: number = 0;
  @Input() oneStarCount: number = 0;

  get totalReviews(): number {
    return (
      this.fiveStarCount +
      this.fourStarCount +
      this.threeStarCount +
      this.twoStarCount +
      this.oneStarCount
    );
  }

  calculateAverageRating(): number {
    const totalStars =
      5 * this.fiveStarCount +
      4 * this.fourStarCount +
      3 * this.threeStarCount +
      2 * this.twoStarCount +
      1 * this.oneStarCount;

    return this.totalReviews !== 0 ? totalStars / this.totalReviews : 0;
  }

  getStarCount(rating: number): number {
    switch (rating) {
      case 5: return this.fiveStarCount;
      case 4: return this.fourStarCount;
      case 3: return this.threeStarCount;
      case 2: return this.twoStarCount;
      case 1: return this.oneStarCount;
      default: return 0;
    }
  }
}
