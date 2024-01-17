import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostReviewsComponent } from './host-reviews.component';

describe('HostReviewsComponent', () => {
  let component: HostReviewsComponent;
  let fixture: ComponentFixture<HostReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostReviewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HostReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
