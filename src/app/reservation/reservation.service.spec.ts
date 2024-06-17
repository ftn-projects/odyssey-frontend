import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReservationService } from './reservation.service';
import { Reservation } from './reservation.model';
import { environment } from '../../env/env';

describe('ReservationService', () => {
  let service: ReservationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservationService]
    });
    service = TestBed.inject(ReservationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a reservation and return it', () => {
    const mockReservation: Reservation = {
      price: 100,
      guestNumber: 5,
      requestDate: new Date(),
      status: 'REQUESTED',
      timeSlot: { start: new Date(), end: new Date() },
      guestId: 7,
      accommodationId: 1
    };

    service.add(mockReservation).subscribe(reservation => {
      expect(reservation).toEqual(mockReservation);
    });

    const req = httpTestingController.expectOne(`${environment.apiHost}reservations`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockReservation);
  });

  it('should handle an error when adding a reservation', () => {
    const mockReservation: Reservation = {
      price: 100,
      guestNumber: 5,
      requestDate: new Date(),
      status: 'REQUESTED',
      timeSlot: { start: new Date(), end: new Date() },
      guestId: 7,
      accommodationId: 1
    };

    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
    const errorMsg = 'Invalid reservation data';

    service.add(mockReservation).subscribe({
      next: () => fail('should have failed with the 400 error'),
      error: (error) => {
        expect(error.error).toEqual(errorMsg);
      }
    });

    const req = httpTestingController.expectOne(`${environment.apiHost}reservations`);
    expect(req.request.method).toEqual('POST');
    req.flush(errorMsg, mockErrorResponse);
  });
});
