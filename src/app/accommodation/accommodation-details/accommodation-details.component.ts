import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Accommodation } from '../model/accommodation.model';
import { AccommodationService } from '../accommodation.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { ReservationService } from '../../reservation/reservation.service';
import { Reservation, Status } from '../../reservation/reservation.model';
import { MatDialog } from '@angular/material/dialog';
import { AccommodationImagesDialogComponent } from '../accommodation-images-dialog/accommodation-images-dialog.component';
import { TimeSlot } from '../../shared/model/time-slot.model';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { MapService } from '../map/map.service';
import { Address } from '../../shared/model/address.model';
import { Amenity } from '../amenity.model';
import { UserService } from '../../user/user.service';

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
    allImageNames: string[] = [];
    imageNames: string[] = []
    fullAddress!: string;
    mapCoordinates!: [number, number]
    amenities: { icon: string, amenity: Amenity}[] = [];
    hostImage!: string;

    constructor(
        private route: ActivatedRoute,
        private service: AccommodationService,
        private resService: ReservationService,
        private cdr: ChangeDetectorRef,
        private dialog: MatDialog,
        private authService: AuthService,
        private mapService: MapService,
        private userService : UserService
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
            this.userService.getProfileImage(accommodation.host?.id ?? 0).subscribe((image: string) => {
                this.hostImage = image;
            });

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
        });

        const icons = this.service.amenityIcons;
        this.service.getAmenities().subscribe({
            next: (amenities) => {
                this.amenities = amenities.map(a => ({
                    icon: icons.get(a.title || 'DEFAULT') || icons.get('DEFAULT') || '',
                    amenity: a
                }));
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
                id: this.id
            },
        });
    }

    sendReservation() {
        this.accommodation.subscribe((accommodation: Accommodation) => {
            const timeSlot: TimeSlot = {
                start: this.reservationDetails.get('dateRange.start')?.value,
                end: this.reservationDetails.get('dateRange.end')?.value,
            };

            const newReservation: Reservation = {
                price: this.totalPrice,
                guestNumber: this.reservationDetails.get('guestGroup.guests')?.value,
                requestDate: new Date(),
                status: Status.REQUESTED,
                timeSlot: timeSlot,
                guestId: this.authService.getId(),
                accommodationId: accommodation.id,
            };

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