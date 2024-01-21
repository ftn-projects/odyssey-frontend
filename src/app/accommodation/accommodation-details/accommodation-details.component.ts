import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Accommodation } from '../model/accommodation.model';
import { AccommodationService } from '../accommodation.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { ReservationService } from '../../reservation/reservation.service';
import { Reservation } from '../../reservation/reservation.model';
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
import { AccommodationReview } from '../../review/model/accommodationReview.model';
import { ReviewService } from '../../review/review.service';
import { Console } from 'console';

import { ReportService } from '../../report/report.service';
import { UserReport } from '../../report/model/user-report.model';
import { ReportDialogComponent } from '../../report/report-dialog/report-dialog.component';
import { SharedService } from '../../shared/shared.service';

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
    reviews!: AccommodationReview[];
    hostId?: number;
    ownerMode: boolean = false;
    currentRole: string | null = null;
    statuses: string[] = ['ACCEPTED'];

    constructor(
        private route: ActivatedRoute,
        private service: AccommodationService,
        private resService: ReservationService,
        private cdr: ChangeDetectorRef,
        private dialog: MatDialog,
        private authService: AuthService,
        private mapService: MapService,
        private reviewService: ReviewService,
        private snackbar: MatSnackBar,
        private sharedService: SharedService
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

    get dateRangeFormGroup(): FormGroup {
        return this.reservationDetails.get('dateRange') as FormGroup;
    }

    ngOnInit(): void {
        this.currentRole = this.authService.getRole();
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
                let errorMessage = this.sharedService.getError(err, 'Error while fetching images');
                    this.sharedService.displaySnackWithButton(errorMessage, "OK");
            },
        });

        this.accommodation.subscribe((accommodation: Accommodation) => {
            this.hostImage = `${environment.apiHost}users/image/${accommodation.host.id}`;
            this.hostId = accommodation.host.id;

            const address: Address = accommodation.address;
            if (address && address.street && address.city && address.country) {
                const fullAddress = `${address.street}, ${address.city}, ${address.country}`;
                this.fullAddress = fullAddress;
                this.mapService.search(fullAddress).subscribe({
                    next: (data) => {
                        console.log(data);
                        if (data.length > 0 && data[0].lat && data[0].lon) {
                            this.mapCoordinates = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
                        }
                    },
                    error: (err) => {
                        let errorMessage = this.sharedService.getError(err, 'Error while getting map data');
                    this.sharedService.displaySnackWithButton(errorMessage, "OK");
                    }
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
                },
                error: (err) => {let errorMessage = this.sharedService.getError(err, 'Error while getting amenities');
                this.sharedService.displaySnackWithButton(errorMessage, "OK");}
            });

            this.ownerMode = accommodation.host.id == this.authService.getId();
        });

        // statuses : string[];


        this.reviewService.findAllAccommodationReviewsFiltered(this.id, null, ['ACCEPTED']).subscribe({
            next: (data: AccommodationReview[]) => {
                this.reviews = data;
                console.log("Reviews: ", this.reviews);
            },
            error: (error) => {
                let errorMessage = this.sharedService.getError(error, 'Error while fetching accommodations');
                    this.sharedService.displaySnackWithButton(errorMessage, "OK");
            }
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
                if (isNaN(guests) || guests <= 0 || guests < accommodation.minGuests || guests > accommodation.maxGuests) {
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
                        let errorMessage = this.sharedService.getError(err, 'Error while getting accommodations');
                    this.sharedService.displaySnackWithButton(errorMessage, "OK");
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

    reportHost() {
        this.dialog.open(ReportDialogComponent, {
            width: '60%',
            minWidth: '300px',
            height: 'min-content',
            data: { reportedId: this.hostId },
        });
    }
}