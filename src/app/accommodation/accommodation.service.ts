import { Injectable } from '@angular/core';
import { Accommodation } from './model/accommodation.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/env';
import { Amenity } from './model/amenity.model';
import { AccommodationRequestCreation } from './model/accommodation-request-create.model';
import { AvailabilitySlot } from './model/availability-slot.model';

@Injectable({
    providedIn: 'root'
})
export class AccommodationService {
    private path: string = environment.apiHost + 'accommodations';

    constructor(private http: HttpClient) {
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
        return this.http.get<Accommodation[]>(environment.apiHost + 'accommodations', { params });
    }

    getById(id: number): Observable<Accommodation> {
        return this.http.get<Accommodation>(environment.apiHost + 'accommodations/' + id);
    }

    getFavorites(guestId: number): Observable<Accommodation[]>{
        return this.http.get<Accommodation[]>(this.path+"/favorites/" + guestId);
    }

    favorite(guestId: number, accommodationId: number): Observable<void> {
        return this.http.put<void>(`${this.path}/favorites/${guestId}/${accommodationId}`, {});
    }

    unfavorite(guestId: number, accommodationId: number): Observable<void> {
        return this.http.delete<void>(`${this.path}/favorites/${guestId}/${accommodationId}`, {});
    }

    getAmenities(): Observable<Amenity[]> {
        return this.http.get<Amenity[]>(this.path + '/amenities');
    }

    getImageUrls(id: number): Observable<string[]> {
        return this.http.get<string[]>(this.path + '/' + id + "/images");
    }

    getImageUrl(id: number, imageName: string): string {
        return this.path + '/' + id + '/images/' + imageName;
    }
    

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

    // SLOT UTILS

    public splitSlots(first: AvailabilitySlot, second: AvailabilitySlot): AvailabilitySlot[] {
        let spliced: AvailabilitySlot[] = [];
        const [firstSlot, secondSlot] = [first.timeSlot, second.timeSlot];
        let price = first.price;

        if (firstSlot.start < secondSlot.start)
            spliced.push({ price, timeSlot: { start: firstSlot.start, end: this.addDays(secondSlot.start, -1) } });

        if (secondSlot.end < firstSlot.end)
            spliced.push({ price, timeSlot: { start: this.addDays(secondSlot.end, 1), end: firstSlot.end } });

        return spliced;
    }

    public addDays(date: Date, days: number): Date {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    public joinSlots(slots: AvailabilitySlot[]): AvailabilitySlot {
        if (slots.length == 1) return slots[0];

        const start = slots[0].timeSlot.start;
        const end = slots[slots.length - 1].timeSlot.end;
        return { price: slots[0].price, timeSlot: { start, end } };
    }
}
