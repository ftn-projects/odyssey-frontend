import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewStarRatingComponent } from './review-star-rating.component';

describe('ReviewStarRatingComponent', () => {
  let component: ReviewStarRatingComponent;
  let fixture: ComponentFixture<ReviewStarRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewStarRatingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewStarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
