import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Accommodation } from '../../model/accommodation.model';
import { ReservationService } from '../../../reservation/reservation.service';
import { AuthService } from '../../../infrastructure/auth/auth.service';
import { SharedService } from '../../../shared/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TimeSlot } from '../../../shared/model/time-slot.model';
import { Reservation } from '../../../reservation/reservation.model';

@Component({
    selector: 'app-reserve-container',
    templateUrl: './reserve-container.component.html',
    styleUrls: ['./reserve-container.component.css']
})
export class ReserveContainerComponent implements OnInit {
    @Input() accommodationData!: Accommodation;
    @Input() currentRole: string | null = null;

    reservationDetails!: FormGroup;
    perPricingPrice!: number;
    totalPrice!: number;
    numberOfDays!: number;

    constructor(
        private resService: ReservationService,
        private authService: AuthService,
        private snackbar: MatSnackBar,
        private cdr: ChangeDetectorRef,
        private sharedService: SharedService
    ) {
        
    }

    get dateRangeFormGroup(): FormGroup {
        return this.reservationDetails.get('dateRange') as FormGroup;
    }

    get guestGroupFormGroup(): FormGroup {
        return this.reservationDetails.get('guestGroup') as FormGroup;
    }

    initializeForm() {
        this.reservationDetails = new FormGroup({
            dateRange: new FormGroup({
                start: new FormControl<Date | null>(null, [Validators.required]),
                end: new FormControl<Date | null>(null, [Validators.required])
            }, { validators: dateRangeValidator() }),
            guestGroup: new FormGroup({
                guests: new FormControl(0, [
                    Validators.required,
                    Validators.min(this.accommodationData.minGuests),
                    Validators.max(this.accommodationData.maxGuests)
                ])
            })
        });

        this.reservationDetails.valueChanges.subscribe(() => {
            this.calculateTotalPrice();
        });
    }


    ngOnInit(): void {
        console.log("Accommodation data:", this.accommodationData);
        if(this.accommodationData) {
            this.initializeForm();
        } 
    }

    sendReservation() {
        if (!this.authService.isLoggedIn()) {
            this.openSnackBar("You must be logged in to make a reservation.", "Close");
            return;
        }
    
        if (this.authService.getRole() !== 'GUEST') {
            this.openSnackBar("You must be logged in as a guest to make a reservation.", "Close");
            return;
        }
    
        if (!this.dateRangeFormGroup.value.start || !this.dateRangeFormGroup.value.end) {
            this.openSnackBar("Please enter a valid date range.", "Close");
            return;
        }
    
        const currentDate = new Date();
        if (this.dateRangeFormGroup.value.start < currentDate || this.dateRangeFormGroup.value.end < currentDate) {
            this.openSnackBar("Selected dates must be in the future.", "Close");
            return;
        }
    
        if (this.dateRangeFormGroup.value.start >= this.dateRangeFormGroup.value.end) {
            this.openSnackBar("End date must be after start date.", "Close");
            return;
        }
    
        if (this.guestGroupFormGroup.value.guests === null || this.guestGroupFormGroup.value.guests === undefined) {
            this.openSnackBar("Please enter a valid number of guests.", "Close");
            return;
        }
    
        if (this.guestGroupFormGroup.invalid && this.guestGroupFormGroup.value.guests !== null) {
            this.openSnackBar("Please enter a valid number of guests according to the accommodation.", "Close");
            return;
        }

            const accommodation = this.accommodationData;
            const startDate = this.reservationDetails.get('dateRange.start')?.value;
            const endDate = this.reservationDetails.get('dateRange.end')?.value;
            const guests = this.reservationDetails.get('guestGroup.guests')?.value;

            const timeSlot: TimeSlot = {
                start: startDate,
                end: endDate,
            };

            const newReservation: Reservation = {
                price: this.totalPrice,
                guestNumber: guests,
                requestDate: new Date(),
                status: 'REQUESTED',
                timeSlot: timeSlot,
                guestId: this.authService.getId(),
                accommodationId: accommodation.id,
            };

            console.log("Sending reservation:", newReservation);
            this.resService.add(newReservation).subscribe({
                next: (reservation: Reservation) => {
                    console.log("Reservation request created successfully:", reservation);
                    this.openSnackBar('Reservation request created successfully', 'Close');
                },
                error: (err) => {
                    let errorMessage = this.sharedService.getError(err, 'A reservation already exists for the desired date range!');
                    console.log(errorMessage);
                    this.sharedService.displaySnackWithButton(errorMessage, "Close");
                }
            });
    }

    calculateTotalPrice() {
        const accommodation = this.accommodationData;
        const pricingType = accommodation.pricing;
        const startDate = this.reservationDetails.get('dateRange.start')?.value;
        const endDate = this.reservationDetails.get('dateRange.end')?.value;
        const numberOfDays = this.calculateNumberOfDays(startDate, endDate);
        this.numberOfDays = numberOfDays;
        const guests = this.reservationDetails.get('guestGroup.guests')?.value;
        accommodation.defaultPrice = this.getPriceForDateRange(accommodation, startDate, endDate) || 2;
        this.perPricingPrice = accommodation.defaultPrice;

        let totalPrice: number;
        if (pricingType === 'PER_PERSON') {
            totalPrice = numberOfDays * accommodation.defaultPrice * guests;
        } else {
            totalPrice = numberOfDays * accommodation.defaultPrice;
        }

        this.totalPrice = totalPrice;

        this.detectChanges();
    }

    private detectChanges() {
        this.cdr.detectChanges();
    }

    calculateNumberOfDays(start: Date | null, end: Date | null): number {
        if (!start || !end) {
            return 0;
        }

        const timeDifference = end.getTime() - start.getTime();

        const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

        return numberOfDays;
    }

    openSnackBar(message: string, action: string) {
        this.snackbar.open(message, action, {
            duration: 3000,
        });
    }

    private getPriceForDateRange(accommodation: Accommodation, start: Date, end: Date): number | null {
        const slots = accommodation.availableSlots;
        if (!slots || slots.length === 0) {
            return null;
        }

        for (const slot of slots) {
            const slotStart = this.parseToDate(slot.timeSlot.start);
            const slotEnd = this.parseToDate(slot.timeSlot.end);

            if (start >= slotStart && end <= slotEnd) {
                return slot.price;
            }
        }

        return null;
    }

    private parseToDate(arrayDate: any) : Date {
        
        return new Date(arrayDate[0], arrayDate[1] - 1, arrayDate[2], arrayDate[3], arrayDate[4])
      }

      
}

export function dateRangeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const startDate = control.get('start')?.value;
        const endDate = control.get('end')?.value;

        if (!startDate || !endDate) {
            return null;
        }

        const currentDate = new Date();

        if (startDate < currentDate || endDate < currentDate) {
            return { 'invalidDate': true };
        }

        if (endDate <= startDate) {
            return { 'invalidRange': true };
        }

        return null; // Validation passes
    };
}
