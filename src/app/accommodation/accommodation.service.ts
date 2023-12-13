import { Injectable } from '@angular/core';
import { AvailabilitySlot } from './model/availability-slot.model';
import { Accommodation } from './model/accommodation.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../env/env';
import { Amenity } from './amenity.model';

@Injectable({
    providedIn: 'root'
})
export class AccommodationService {
    constructor(private httpClient: HttpClient) {
    }

    getAll(
        dateStart?: Date,
        dateEnd?: Date,
        guestNumber?: number,
        amenities?: number[] | null,
        type?: string,
        priceStart?: number,
        priceEnd?: number
    ): Observable<Accommodation[]> {
        // Construct query parameters
        let params = new HttpParams();
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
        return this.path + '/' + id  +'/images/' + imageName;
    }
    

    splitSlots(first: AvailabilitySlot, second: AvailabilitySlot): AvailabilitySlot[] {
        let spliced: AvailabilitySlot[] = [];
        if (first.start < second.start) {
            if (second.end < first.end) spliced.push({ price: first.price, start: first.start, end: new Date(second.start.getDate() - 1) },
                second, { price: first.price, start: new Date(second.end.getDate() + 1), end: first.end });
            else spliced.push({ price: first.price, start: first.start, end: new Date(second.start.getDate() - 1) }, second);
        }
        else {
            if (second.end > first.end) spliced.push(second);
            else spliced.push(second, { price: first.price, start: new Date(second.end.getDate() + 1), end: first.end });
        }

        return spliced;
    }

    
}
