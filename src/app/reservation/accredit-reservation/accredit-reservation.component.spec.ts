import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditReservationComponent } from './accredit-reservation.component';

describe('AccreditReservationComponent', () => {
  let component: AccreditReservationComponent;
  let fixture: ComponentFixture<AccreditReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccreditReservationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccreditReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
