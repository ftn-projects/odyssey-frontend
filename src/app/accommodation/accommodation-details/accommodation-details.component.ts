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

    }

    ngOnInit(): void {
        this.currentRole = this.authService.getRole();
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.accommodation = this.service.getById(this.id);
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


    

    private detectChanges() {
        this.cdr.detectChanges();
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