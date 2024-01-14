import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationService } from '../accommodation.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AccommodationImagesDialogComponent } from '../accommodation-images-dialog/accommodation-images-dialog.component';
import { MapService } from '../map/map.service';
import { Address } from '../../shared/model/address.model';
import { Amenity } from '../model/amenity.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../env/env';
import { AccommodationRequestService } from '../accommodation-request.service';
import { AccommodationRequest } from '../model/accommodation-request.model';

@Component({
    selector: 'app-accommodation-request-details',
    templateUrl: './accommodation-request-details.component.html',
    styleUrls: ['./accommodation-request-details.component.css']
})
export class AccommodationRequestDetailsComponent {
    id!: number;
    request!: Observable<AccommodationRequest>;
    reservationDetails: FormGroup;
    totalPrice!: number;
    numberOfDays!: number;
    allImageNames: string[] = [];
    imageNames: string[] = []
    fullAddress!: string;
    mapCoordinates!: [number, number]
    amenities: { icon: string, amenity: Amenity }[] = [];
    hostImage!: string;

    constructor(
        private route: ActivatedRoute,
        private service: AccommodationRequestService,
        private accommodationService: AccommodationService,
        private dialog: MatDialog,
        private mapService: MapService,
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
            this.request = this.service.getById(this.id);
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

        this.request.subscribe((request: AccommodationRequest) => {
            console.log(request);
            this.hostImage = `${environment.apiHost}users/image/${request.host!.id}`;

            const address: Address = request.details!.address;
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
                    error: (err) => console.error(err),
                });
            }

            const icons = this.accommodationService.amenityIcons;
            this.accommodationService.getAmenities().subscribe({
                next: (amenities) => {
                    console.log(request.details?.amenities);

                    this.amenities = amenities
                        .filter(amenity => request.details?.amenities.findIndex(a => a.id == amenity.id) != -1)
                        .map(a => ({
                            icon: icons.get(a.title || 'DEFAULT') || icons.get('DEFAULT') || '',
                            amenity: a
                        }));
                }
            });
        });

        const icons = this.accommodationService.amenityIcons;
        this.accommodationService.getAmenities().subscribe({
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
                id: this.id,
                requests: true
            },
        });
    }

    openSnackBar(message: string, action: string) {
        this.snackbar.open(message, action);
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