import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationStatsExpandedComponent } from './accommodation-stats-expanded.component';

describe('AccommodationStatsExpandedComponent', () => {
  let component: AccommodationStatsExpandedComponent;
  let fixture: ComponentFixture<AccommodationStatsExpandedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccommodationStatsExpandedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationStatsExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
