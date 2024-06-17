import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule

import { ReserveContainerComponent } from './reserve-container.component';

import { ReservationService } from '../../../reservation/reservation.service';
import { AuthService } from '../../../infrastructure/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedService } from '../../../shared/shared.service';
import { Accommodation } from '../../model/accommodation.model';
import { SearchDaterangePickerComponent } from '../../accommodation-list/search-daterange-picker/search-daterange-picker.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { NavBarComponent } from '../../../layout/nav-bar/nav-bar.component';
import { MatDateRangeInput, MatDateRangePicker, MatDatepicker, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Reservation } from '../../../reservation/reservation.model';
import { of, throwError } from 'rxjs';

describe('ReserveContainerComponent', () => {
    let component: ReserveContainerComponent;
  let fixture: ComponentFixture<ReserveContainerComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
    let mockResService: jasmine.SpyObj<ReservationService>;
    let mockSharedService: jasmine.SpyObj<SharedService>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'getRole', 'getId']);
    mockResService = jasmine.createSpyObj('ReservationService', ['add']);
    mockSharedService = jasmine.createSpyObj('SharedService', ['getError', 'displaySnackWithButton']);

    await TestBed.configureTestingModule({
      declarations: [ReserveContainerComponent, SearchDaterangePickerComponent, MatLabel, MatFormField, NavBarComponent,MatDateRangeInput, MatDatepicker, MatDatepickerToggle, MatDateRangePicker],
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatNativeDateModule, MatDatepickerModule, MatInputModule],
      providers: [
        { provide: MatSnackBar, useValue: {} }, // Mock MatSnackBar
        { provide: ReservationService, useValue: mockResService }, // Mock ReservationService
        { provide: AuthService, useValue: mockAuthService }, // Mock AuthService
        { provide: ChangeDetectorRef, useValue: { } }, // Mock ChangeDetectorRef
        { provide: SharedService, useValue: mockSharedService },
        provideAnimations() // Mock SharedService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveContainerComponent);
    component = fixture.componentInstance;
    component.accommodationData = {
      id: '1',
      minGuests: 1,
      maxGuests: 10,
      pricing: 'PER_PERSON',
      availableSlots: [],
      defaultPrice: 10
    } as unknown as Accommodation;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call openSnackbar with appropriate message if user is not logged in', () => {
    mockAuthService.isLoggedIn.and.returnValue(false);
    mockAuthService.getRole.and.returnValue('GUEST');
    spyOn(component, 'openSnackBar');

    component.sendReservation();

    expect(component.openSnackBar).toHaveBeenCalledWith('You must be logged in to make a reservation.', 'Close');
});


it('should call openSnackbar with appropriate message if user is not logged in as a guest', () => {
    mockAuthService.isLoggedIn.and.returnValue(true);
    mockAuthService.getRole.and.returnValue('HOST');
    spyOn(component, 'openSnackBar');

    component.sendReservation();

    expect(component.openSnackBar).toHaveBeenCalledWith('You must be logged in as a guest to make a reservation.', 'Close');
});


it('should call openSnackbar with appropriate message if guest number is not set', () => {
    mockAuthService.isLoggedIn.and.returnValue(true);
    mockAuthService.getRole.and.returnValue('GUEST');
    let currentDate = new Date();
    let startDate = (currentDate.getTime() + 10);
    let endDate = (startDate + 1);
    component.dateRangeFormGroup.setValue({ start: startDate, end: endDate });
    component.guestGroupFormGroup.setValue({ guests: null});
    spyOn(component, 'openSnackBar');

    component.sendReservation();

    expect(component.openSnackBar).toHaveBeenCalledWith('Please enter a valid number of guests.', 'Close');
});
    
it('should call openSnackbar with appropriate message if guest number is not withing the range of the accommodation', () => {
    mockAuthService.isLoggedIn.and.returnValue(true);
    mockAuthService.getRole.and.returnValue('GUEST');
    let currentDate = new Date();
    let startDate = (currentDate.getTime() + 10);
    let endDate = (startDate + 1);
    component.dateRangeFormGroup.setValue({ start: startDate, end: endDate });
    component.guestGroupFormGroup.setValue({ guests: 11});
    spyOn(component, 'openSnackBar');

    component.sendReservation();

    expect(component.openSnackBar).toHaveBeenCalledWith('Please enter a valid number of guests according to the accommodation.', 'Close');
});

it('should call openSnackbar with appropriate message if either start date or end date are invalid', () => {
    mockAuthService.isLoggedIn.and.returnValue(true);
    mockAuthService.getRole.and.returnValue('GUEST');
    component.guestGroupFormGroup.setValue({ guests: 5});
    component.dateRangeFormGroup.setValue({ start: null, end: null });
    spyOn(component, 'openSnackBar');

    component.sendReservation();

    expect(component.openSnackBar).toHaveBeenCalledWith('Please enter a valid date range.', 'Close');
});


it('should call openSnackbar with appropriate message if either start date or end date are in the past', () => {
    mockAuthService.isLoggedIn.and.returnValue(true);
    mockAuthService.getRole.and.returnValue('GUEST');
    component.guestGroupFormGroup.setValue({ guests: 5});
    let currentDate = new Date();
    let pastDate = new Date(currentDate.getTime() - 1);
    
    component.dateRangeFormGroup.setValue({ start: pastDate, end: currentDate });
    spyOn(component, 'openSnackBar');

    component.sendReservation();

    expect(component.openSnackBar).toHaveBeenCalledWith('Selected dates must be in the future.', 'Close');
});


it('should call openSnackbar with appropriate message if endDate is before startDate', () => {
    mockAuthService.isLoggedIn.and.returnValue(true);
    mockAuthService.getRole.and.returnValue('GUEST');
    mockAuthService.getId.and.returnValue('7');
    component.guestGroupFormGroup.setValue({ guests: 5});
    const currentDate = new Date();
    let startDate = (currentDate.getTime() + 10);
    let endDate = (startDate - 1);

    
    component.dateRangeFormGroup.setValue({ start: startDate, end: endDate });
    spyOn(component, 'openSnackBar');

    component.sendReservation();

    expect(component.openSnackBar).toHaveBeenCalledWith('End date must be after start date.', 'Close');
});




it('should call openSnackbar with appropriate message if all data is valid', () => {


    
    mockAuthService.isLoggedIn.and.returnValue(true);
    mockAuthService.getRole.and.returnValue('GUEST');

    let currentDate = new Date();
    let startDate = new Date((currentDate.getTime() + 100));
    let endDate = new Date((startDate.getTime() + 100));
    component.dateRangeFormGroup.setValue({ start: startDate, end: endDate });
    component.guestGroupFormGroup.setValue({ guests: 5});
    spyOn(component, 'openSnackBar');

    const mockReservation: Reservation = {
        price: 100,
        guestNumber: 5,
        requestDate: new Date(),
        status: 'REQUESTED',
        timeSlot: { start: startDate, end: endDate },
        guestId: 7,
        accommodationId: 1
    };

    mockResService.add.and.returnValue(of(mockReservation));

    component.sendReservation();

    expect(component.openSnackBar).toHaveBeenCalledWith('Reservation request created successfully', 'Close');
});


it('should call openSnackbar with appropriate message if there is already a reservation with the same TimeSlot', () => {
    mockAuthService.isLoggedIn.and.returnValue(true);
    mockAuthService.getRole.and.returnValue('GUEST');

    let currentDate = new Date();
    let startDate = new Date((currentDate.getTime() + 100));
    let endDate = new Date((startDate.getTime() + 100));
    component.dateRangeFormGroup.setValue({ start: startDate, end: endDate });
    component.guestGroupFormGroup.setValue({ guests: 5});
    spyOn(component, 'openSnackBar');

    const mockReservation: Reservation = {
        price: 100,
        guestNumber: 5,
        requestDate: new Date(),
        status: 'REQUESTED',
        timeSlot: { start: startDate, end: endDate },
        guestId: 7,
        accommodationId: 1
    };

    const mockErrorResponse = { error: 'A reservation already exists for the desired date range!' };
    mockResService.add.and.returnValue(throwError({ error: mockErrorResponse }));

    mockSharedService.getError.and.returnValue('A reservation already exists for the desired date range!');
    mockSharedService.displaySnackWithButton.and.callFake((message: string, action: string) => {
        component.openSnackBar(message, action);
    });

    component.sendReservation();

    expect(component.openSnackBar).toHaveBeenCalledWith('A reservation already exists for the desired date range!', 'Close');
});

});
