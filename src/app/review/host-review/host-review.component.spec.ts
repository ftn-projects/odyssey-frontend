import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostReviewComponent } from './host-review.component';

describe('HostReviewComponent', () => {
  let component: HostReviewComponent;
  let fixture: ComponentFixture<HostReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HostReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
