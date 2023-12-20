import { Injectable } from '@angular/core';
import { Accommodation } from './model/accommodation.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/env';
import { Amenity } from './model/amenity.model';
import { AccommodationRequestCreation } from './model/accommodation-request-create.model';

@Injectable({
    providedIn: 'root'
})
export class AccommodationService {
    constructor(private httpClient: HttpClient) {
    }

    getAll(
        location?: string,
        dateStart?: Date,
        dateEnd?: Date,
        guestNumber?: number,
        amenities?: number[] | null,
        type?: string,
        priceStart?: number,
        priceEnd?: number
    ): Observable<Accommodation[]> {
        let params = new HttpParams();
        if (location) params = params.set('location', location);
        if (dateStart) params = params.set('dateStart', dateStart.toString());
        if (dateEnd) params = params.set('dateEnd', dateEnd.toString());
        if (guestNumber) params = params.set('guestNumber', guestNumber);
        if (amenities) params = params.set('amenities', amenities.join(','));
        if (type) params = params.set('type', type.toString());
        if (priceStart) params = params.set('priceStart', priceStart);
        if (priceEnd) params = params.set('priceEnd', priceEnd);

        return this.httpClient.get<Accommodation[]>(environment.apiHost + 'accommodations', { params });
    }

    getById(id: number): Observable<Accommodation> {
        return this.httpClient.get<Accommodation>(environment.apiHost + 'accommodations/' + id);
    }


    private path: string = environment.apiHost + 'accommodations';


    getAmenities(): Observable<Amenity[]> {
        return this.httpClient.get<Amenity[]>(this.path + '/amenities');
    }

    getImageUrls(id: number): Observable<string[]> {
        return this.httpClient.get<string[]>(this.path + '/' + id + "/images");
    }

    getImageUrl(id: number, imageName: string): string {
        return this.path + '/' + id + '/images/' + imageName;
    }


    // splitSlots(first: AvailabilitySlot, second: AvailabilitySlot): AvailabilitySlot[] {
    //     let spliced: AvailabilitySlot[] = [];
    //     if (first.start < second.start) {
    //         if (second.end < first.end) spliced.push({ price: first.price, start: first.start, end: new Date(second.start.getDate() - 1) },
    //             second, { price: first.price, start: new Date(second.end.getDate() + 1), end: first.end });
    //         else spliced.push({ price: first.price, start: first.start, end: new Date(second.start.getDate() - 1) }, second);
    //     }
    //     else {
    //         if (second.end > first.end) spliced.push(second);
    //         else spliced.push(second, { price: first.price, start: new Date(second.end.getDate() + 1), end: first.end });
    //     }

    //     return spliced;
    // }

    amenityIcons = new Map<string, string>([
        ['TV', 'tv'],
        ['WiFi', 'wifi'],
        ['Kitchen', 'local_dining'],
        ['Free parking', 'local_parking'],
        ['Beach access', 'beach_access'],
        ['Washer', 'local_laundry_service'],
        ['Spa', 'spa'],
        ['Air conditioning', 'ac_unit'],
        ['King bed', 'king_bed'],
        ['Smoking room', 'smoking_rooms'],
        ['DEFAULT', 'house']
    ]);
}
