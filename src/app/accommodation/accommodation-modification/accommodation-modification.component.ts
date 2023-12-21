import { Component, OnInit } from '@angular/core';
import { AmenityView } from '../model/amenity.model';
import { AccommodationService } from '../accommodation.service';
import { AvailabilitySlot } from '../model/availability-slot.model';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from '../../shared/shared.service';
import { overlapping } from '../../shared/model/time-slot.model';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccommodationRequestCreation } from '../model/accommodation-request-create.model';
import { environment } from '../../../env/env';
import { FileService } from '../../shared/file.service';
import { forkJoin } from 'rxjs';
import { Image } from '../../shared/image-uploader/image.model';
import { AccommodationRequestService } from '../accommodation-request.service';
import { COUNTRIES_DB_EU, Country } from '@angular-material-extensions/select-country';


@Component({
    selector: 'app-accommodation-modification',
    templateUrl: './accommodation-modification.component.html',
    styleUrl: './accommodation-modification.component.css'
})
export class AccommodationModificationComponent implements OnInit {
    editing: boolean = false;
    accommodation: AccommodationRequestCreation = {
        id: -1,
        requestType: 'CREATE',
        newTitle: '',
        newDescription: '',
        newType: 'APARTMENT', // Assuming type is an enum
        newAddress: { street: '', number: 0, city: '', country: '' },
        newPricing: 'PER_PERSON',
        newDefaultPrice: 0,
        newAutomaticApproval: false,
        newCancellationDue: 0,
        newAvailableSlots: [],
        newAmenities: [],
        newMinGuests: 1,
        newMaxGuests: 1,
        hostId: -1,
    }

    selectedConfirmation: string = 'MANUAL';
    amenities: AmenityView[] = [];

    slotColumns: string[] = ['start', 'end', 'price', 'delete'];
    slots: AvailabilitySlot[] = [];
    slotsTableData = new MatTableDataSource<AvailabilitySlot>();

    price: number = 0;
    dateRange = new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null)
    });

    selectedCountry: Country = { alpha2Code: 'RS', name: 'Serbia' };

    constructor(
        protected accommodationService: AccommodationService,
        private requestService: AccommodationRequestService,
        private sharedService: SharedService,
        private authService: AuthService,
        private fileService: FileService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit(): void {
        const icons = this.accommodationService.amenityIcons;
        this.accommodationService.getAmenities().subscribe({
            next: (amenities) => {
                this.amenities = amenities.map(a => ({
                    icon: icons.get(a.title || 'DEFAULT') || icons.get('DEFAULT'),
                    selected: false,
                    title: a.title,
                    id: a.id,
                }));

                this.route.params.subscribe(params => {
                    if (params['id'])
                        this.initEditing(params['id']);
                });
            }
        });
        this.accommodation.hostId = this.authService.getId();
    }

    initEditing(id: number) {
        this.editing = true;
        this.accommodationService.getById(id).subscribe({
            next: (accommodation) => {
                console.log(accommodation);

                this.accommodation.newTitle = accommodation.title;
                this.accommodation.newDescription = accommodation.description;
                this.accommodation.newType = accommodation.type;
                this.accommodation.newAddress = accommodation.address;
                this.accommodation.newDefaultPrice = accommodation.defaultPrice;
                this.accommodation.newAutomaticApproval = accommodation.automaticApproval;
                this.accommodation.newCancellationDue = accommodation.cancellationDue;
                this.accommodation.newMinGuests = accommodation.minGuests;
                this.accommodation.newMaxGuests = accommodation.maxGuests;
                this.accommodation.requestType = 'UPDATE';
                this.accommodation.accommodationId = accommodation.id;

                this.slots = [];
                accommodation.availableSlots.forEach(s =>
                    this.slots.push({
                        price: s.price, timeSlot:
                            { start: new Date(s.timeSlot.start), end: new Date(s.timeSlot.end) }
                    }));
                this.refreshTable();

                accommodation.amenities.forEach((amenity) => {
                    let index = this.amenities.findIndex((a) => a.id == amenity.id);
                    if (index != -1) this.amenities[index].selected = true;
                });

                this.findCountry(accommodation.address.country!);

                this.accommodationService.getImageUrls(id).subscribe({
                    next: (imageNames) => {
                        imageNames.forEach((name) => {
                            let url = this.accommodationService.getImageUrl(id, name);
                            this.fileService.load(url).subscribe({
                                next: (blob) => {
                                    this.images.push({
                                        file: new File([blob], name),
                                        url: url
                                    });
                                },
                                error: (err) => console.log(err)
                            });
                        });
                    },
                    error: (err) => console.log(err)
                });
            },
            error: (err) => {
                console.log(err);
                if (err.status == 404)
                    this.sharedService.displayError(`Accommodation with id ${id} not found.`);
            }
        });
        COUNTRIES_DB_EU.forEach((c) => {
            if (c.name == "Serbia") this.selectedCountry = c;
        });
    }

    onSubmit() {
        this.accommodation.newAutomaticApproval = this.selectedConfirmation == 'AUTOMATIC';
        this.accommodation.newAvailableSlots = this.slots;
        this.accommodation.newAmenities = this.amenities.filter(a => a.selected).map(a => ({ id: a.id!, title: a.title! }));
        this.accommodation.newAddress!.country = this.selectedCountry ? this.selectedCountry.name : '';

        this.requestService.create(this.accommodation).subscribe({
            next: (model) => {
                console.log('model', model);
                this.uploadSelectedImages(model.id!).subscribe({
                    next: () => {
                        console.log('Uploaded images.');
                        confirm('Accommodation has been successfully created.');
                        this.router.navigate(['']);
                    },
                    error: (err) => {
                        console.log(err);

                        let errMessage = 'Could not upload the images!';
                        if (err.error && err.error.message)
                            errMessage = err.error.message;
                        this.sharedService.displayError(errMessage);
                    }
                });
            },
            error: (err) => this.sharedService.displayFirstError(err)
        });
    }

    onAddSlot() {
        console.log(this.images);

        let start = this.dateRange.get('start')?.value;
        let end = this.dateRange.get('end')?.value;
        if (!start) {
            this.sharedService.displayError('Please select starting date of the slot.');
            return;
        }
        if (!end) {
            this.sharedService.displayError('Please select ending date of the slot.');
            return;
        }

        let slot = { timeSlot: { start: start!, end: end! }, price: this.price }
        if (slot.price < 0) {
            this.sharedService.displayError('Price cannot be negative.');
            return;
        }
        if (slot.timeSlot.end < slot.timeSlot.start) {
            this.sharedService.displayError('End is before start.');
            return;
        }
        if (this.slots.find(s => (overlapping(s.timeSlot, slot.timeSlot)))) {
            this.sharedService.displayError('Slot overlaps with existing.');
            return;
        }
        this.slots.push(slot);
        this.refreshTable();

        this.dateRange.get('start')?.setValue(null);
        this.dateRange.get('end')?.setValue(null);
        this.price = 0;
    }

    removeSlot(i: number) {
        let temp = [];
        for (let [j, s] of this.slots.entries())
            if (j != i) temp.push(s);

        this.slots = temp;
        this.refreshTable();
    }

    refreshTable = () => this.slotsTableData.data = this.slots;

    images: Image[] = [];

    selectImages(selectedImages: File[]) {
        console.log(selectedImages);

        selectedImages.forEach(image => {
            var reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = (event) => {
                if (event && event.target && typeof event.target.result === 'string')
                    this.images.push({ file: image, url: event.target.result });
            };
        });
    }

    uploadSelectedImages(id: number) {
        let endpoint = `${environment.apiHost}accommodationRequests/image/${id}`;
        return forkJoin(this.images.map(
            image => this.fileService.upload(image.file, endpoint, 'image'))
        );
    }

    trackImage = (index: number, image: Image) => image ? image.url : index;
    removeImage = (index: number) => this.images.splice(index, 1);

    findCountry(name: string): void {
        COUNTRIES_DB_EU.forEach((c) => {
            if (c.name == name) this.selectedCountry = c;
        });
    }
};