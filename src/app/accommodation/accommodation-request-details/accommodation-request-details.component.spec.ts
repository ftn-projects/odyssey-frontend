import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationRequestDetailsComponent } from './accommodation-request-details.component';

describe('AccommodationRequestDetailsComponent', () => {
  let component: AccommodationRequestDetailsComponent;
  let fixture: ComponentFixture<AccommodationRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccommodationRequestDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
