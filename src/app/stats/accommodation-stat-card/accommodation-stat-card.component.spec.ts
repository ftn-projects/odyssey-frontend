import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationStatCardComponent } from './accommodation-stat-card.component';

describe('AccommodationStatCardComponent', () => {
  let component: AccommodationStatCardComponent;
  let fixture: ComponentFixture<AccommodationStatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccommodationStatCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationStatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
