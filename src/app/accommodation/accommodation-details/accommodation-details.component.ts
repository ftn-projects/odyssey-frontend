import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Accommodation } from '../model/accommodation.model';
import { AccommodationService } from '../accommodation.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ReservationService } from '../../reservation/reservation.service';
import { Reservation, Status } from '../../reservation/reservation.model';
import { MatDialog } from '@angular/material/dialog';
import { AccommodationImagesDialogComponent } from '../accommodation-images-dialog/accommodation-images-dialog.component';
import { TimeSlot } from '../../shared/model/time-slot.model';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { MapService } from '../map/map.service';
import { Address } from '../../shared/model/address.model';
import { Amenity } from '../model/amenity.model';
import { UserService } from '../../user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../env/env';
import { AvailabilitySlot } from '../model/availability-slot.model';

@Component({
    selector: 'app-accommodation-details',
    templateUrl: './accommodation-details.component.html',
    styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent {
    id!: number;
    accommodation!: Observable<Accommodation>;
    reservationDetails: FormGroup;
    perPricingPrice!: number;
    totalPrice!: number;
    numberOfDays!: number;
    allImageNames: string[] = [];
    imageNames: string[] = []
    fullAddress!: string;
    mapCoordinates!: [number, number]
    amenities: { icon: string, amenity: Amenity }[] = [];
    hostImage!: string;
    ownerMode: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private service: AccommodationService,
        private resService: ReservationService,
        private cdr: ChangeDetectorRef,
        private dialog: MatDialog,
        private authService: AuthService,
        private mapService: MapService,
        private userService: UserService,
        private snackbar: MatSnackBar
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


        this.service.getImageUrls(this.id).subscribe({
            next: (data: string[]) => {
                this.allImageNames.push(...data);
                const firstFiveImageNames = data.slice(0, 5);
                this.imageNames.push(...firstFiveImageNames.map(imageName => this.service.getImageUrl(this.id, imageName)));
            },
            error: (err) => {
                console.error('Error fetching image URLs:', err);
            },
        });

        this.accommodation.subscribe((accommodation: Accommodation) => {
            this.hostImage = `${environment.apiHost}users/image/${accommodation.host.id}`;

            const address: Address = accommodation.address;
            if (address && address.street && address.number && address.city && address.country) {
                const fullAddress = `${address.street} ${address.number}, ${address.city}, ${address.country}`;
                this.fullAddress = fullAddress;
                this.mapService.search(fullAddress).subscribe({
                    next: (data) => {
                        console.log(data);
                        if (data.length > 0 && data[0].lat && data[0].lon) {
                            this.mapCoordinates = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
                        }
                    },
                    error: (err) => console.error(err),
                });
            }

            const icons = this.service.amenityIcons;
            this.service.getAmenities().subscribe({
                next: (amenities) => {
                    this.amenities = amenities
                        .filter(amenity => accommodation.amenities.findIndex(a => a.id == amenity.id) != -1)
                        .map(a => ({
                            icon: icons.get(a.title || 'DEFAULT') || icons.get('DEFAULT') || '',
                            amenity: a
                        }));
                }
            });

            this.ownerMode = accommodation.host.id == this.authService.getId();
        });
    }

    openDialog() {
        const dialogRef = this.dialog.open(AccommodationImagesDialogComponent, {
            height: '100vh',
            width: '100vw',
            maxWidth: '100vw',
            data: {
                images: this.allImageNames,
                id: this.id,
                requests: false
            },
        });
    }

    openSnackBar(message: string, action: string) {
        this.snackbar.open(message, action);
    }


    sendReservation() {
        if (this.authService.isLoggedIn() && this.authService.getRole() === 'GUEST') {
            const accommodationSubscription = this.accommodation.subscribe((accommodation: Accommodation) => {
                const startDate = this.reservationDetails.get('dateRange.start')?.value;
                const endDate = this.reservationDetails.get('dateRange.end')?.value;
                if (!startDate || !endDate || startDate >= endDate) {
                    this.openSnackBar("Invalid date range. Please select valid dates.", "Close");
                    return;
                }

                const currentDate = new Date();
                if (startDate < currentDate || endDate < currentDate) {
                    this.openSnackBar("Selected dates cannot be in the past. Please select future dates.", "Close");
                    return;
                }

                const guests = this.reservationDetails.get('guestGroup.guests')?.value;
                if (isNaN(guests) || guests <= 0) {
                    this.openSnackBar("Invalid number of guests. Please enter a valid number.", "Close");
                    return;
                }

                const timeSlot: TimeSlot = {
                    start: startDate,
                    end: endDate,
                };

                const newReservation: Reservation = {
                    price: this.totalPrice,
                    guestNumber: guests,
                    requestDate: new Date(),
                    status: Status.REQUESTED,
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
                        console.log(err);
                        this.openSnackBar("Something went wrong!", "Close");
                    }
                });
            });
        } else {
            this.openSnackBar("You must be logged in as a guest to make a reservation!", "Close");
        }
    }


    calculateTotalPrice() {
        this.accommodation.subscribe((accommodation: Accommodation) => {
            const pricingType = accommodation.pricing;
            const startDate = this.reservationDetails.get('dateRange.start')?.value;
            const endDate = this.reservationDetails.get('dateRange.end')?.value;
            const numberOfDays = this.calculateNumberOfDays(startDate, endDate);
            this.numberOfDays = numberOfDays;
            const guests = this.reservationDetails.get('guestGroup.guests')?.value;
            accommodation.defaultPrice = this.getPriceForDateRange(accommodation, startDate, endDate) || -2;
            this.perPricingPrice = accommodation.defaultPrice;

            let totalPrice: number;
            if (pricingType === 'PER_PERSON') {
                totalPrice = numberOfDays * accommodation.defaultPrice * guests;
            } else {
                totalPrice = numberOfDays * accommodation.defaultPrice;
            }

            this.totalPrice = totalPrice;

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

        const timeDifference = end.getTime() - start.getTime();

        const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

        return numberOfDays;
    }

    customDateFilter = (date: Date | null): boolean => {
        if (!date) {
            return false;
        }


        let isDateAvailable = false;

        this.accommodation.subscribe(accommodation => {

            if (accommodation.availableSlots) {
                isDateAvailable = accommodation.availableSlots.some(
                    slot => this.isDateInSlot(date, slot)
                );

            }
        });

        return isDateAvailable;
    };

    private isDateInSlot(date: Date, slot: AvailabilitySlot): boolean {
        const startDate = new Date(slot.timeSlot.start);
        const endDate = new Date(slot.timeSlot.end);
        return date >= startDate && date <= endDate;
    }

    getPriceForDateRange(accommodation: Accommodation, startDate: Date, endDate: Date): number | null {
        if (!accommodation.availableSlots || !startDate || !endDate) {
            return null;
        }
        accommodation.availableSlots.forEach(slot => {
            console.log(slot)
        });
        const matchingSlot = accommodation.availableSlots.find(slot =>
            new Date(startDate) >= new Date(slot.timeSlot.start) && new Date(endDate) <= new Date(slot.timeSlot.end)
        );

        return matchingSlot ? matchingSlot.price : null;
    }

}