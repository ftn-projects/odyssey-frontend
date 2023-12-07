import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Accommodation } from '../model/accommodation.model';
import { AccommodationService } from '../accommodation.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { ReservationService } from '../../reservation/reservation.service';
import { Reservation, Status } from '../../reservation/reservation.model';
import { TimeSlot } from '../model/time-slot.model';

@Component({
    selector: 'app-accommodation-details',
    templateUrl: './accommodation-details.component.html',
    styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent {
    id!: number;
    accommodation!: Observable<Accommodation>;
    reservationDetails: FormGroup;
    totalPrice!: number;
    numberOfDays!: number;

    constructor(
        private route: ActivatedRoute,
        private service: AccommodationService,
        private resService: ReservationService,
        private cdr: ChangeDetectorRef
    ) {
        this.reservationDetails = new FormGroup({
            dateRange: new FormGroup({
                start: new FormControl<Date | null>(null),
                end: new FormControl<Date | null>(null)
            }),
            guestGroup: new FormGroup({
                guests: new FormControl(0)
            })
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.accommodation = this.service.getById(this.id);
        });

        this.reservationDetails.valueChanges.subscribe(() => {
            this.calculateTotalPrice();
        });
    }

    sendReservation() {
        this.accommodation.subscribe((accommodation: Accommodation) => {
            // Create a new TimeSlot for demonstration purposes
            const timeSlot: TimeSlot = {
                start: this.reservationDetails.get('dateRange.start')?.value,
                end: this.reservationDetails.get('dateRange.end')?.value,
            };

            // Create a new Reservation object
            const newReservation: Reservation = {
                price: this.totalPrice, // Replace with the actual price
                guestNumber: this.reservationDetails.get('guestGroup.guests')?.value, // Replace with the actual guest number
                requestDate: new Date(), // Replace with the actual request date
                status: Status.REQUESTED, // Replace with the desired status
                timeSlot: timeSlot, // Assign the TimeSlot object
                guestId: 2, // Replace with the actual guest ID
                accommodationId: accommodation.id, // Replace with the actual accommodation ID
            };

            // Now you can use the newReservation object as needed, for example, send it to the server
            console.log("Sending reservation:", newReservation);
            this.resService.add(newReservation).subscribe({
                next: (reservation: Reservation) => console.log("Reservation sent successfully:", reservation),
                error: (err) => console.log(err)
            });
        });
    }


    calculateTotalPrice() {
        this.accommodation.subscribe((accommodation: Accommodation) => {
            const pricingType = accommodation.pricing;
            const startDate = this.reservationDetails.get('dateRange.start')?.value;
            const endDate = this.reservationDetails.get('dateRange.end')?.value;
            const numberOfDays = this.calculateNumberOfDays(startDate, endDate);
            this.numberOfDays = numberOfDays;
            const guests = this.reservationDetails.get('guestGroup.guests')?.value;

            let totalPrice: number;
            console.log("Days: " + numberOfDays);
            console.log("Guests: " + guests);
            if (pricingType === 'PER_PERSON') {
                totalPrice = numberOfDays * accommodation.defaultPrice * guests;
            } else {
                totalPrice = numberOfDays * accommodation.defaultPrice;
            }

            // Update the total price property in the accommodation object
            this.totalPrice = totalPrice;

            // Manually trigger change detection
            this.detectChanges();
        });
    }

    private detectChanges() {
        this.cdr.detectChanges();
    }

    calculateNumberOfDays(start: Date | null, end: Date | null): number {
        if (!start || !end) {
            return 0;
        }

        // Calculate the time difference in milliseconds
        const timeDifference = end.getTime() - start.getTime();

        // Calculate the number of days
        const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

        return numberOfDays;
    }

}