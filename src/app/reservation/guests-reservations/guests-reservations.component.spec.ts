import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestsReservationsComponent } from './guests-reservations.component';

describe('GuestsReservationsComponent', () => {
  let component: GuestsReservationsComponent;
  let fixture: ComponentFixture<GuestsReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuestsReservationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuestsReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
