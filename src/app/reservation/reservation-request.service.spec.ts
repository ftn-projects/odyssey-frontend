import { TestBed } from '@angular/core/testing';

import { ReservationRequestService } from './reservation-request.service';

describe('ReservationRequestService', () => {
  let service: ReservationRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
