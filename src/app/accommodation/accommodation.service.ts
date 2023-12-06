import { Injectable } from '@angular/core';
import { AvailabilitySlot } from './availability-slot.model';
import { Accommodation } from './model/accommodation.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/env';
import { User } from '../account/model/user.model';

@Injectable({
    providedIn: 'root'
})
export class AccommodationService {
    constructor(private httpClient: HttpClient) {
    }

    getAll(): Observable<Accommodation[]> {
        return this.httpClient.get<Accommodation[]>(environment.apiHost + 'accommodations')
      }

    


    joinSlots(first: AvailabilitySlot, second: AvailabilitySlot): AvailabilitySlot {
        let joined: AvailabilitySlot = {
            price: 0,
            start: new Date(),
            end: new Date()
        };
        if (first.price == second.price) {
            joined.price = first.price;

            if (first.start < second.start) joined.start = first.start;
            else joined.start = second.start;

            if (first.end > second.end) joined.end = first.end;
            else joined.end = second.end;
        }
        return joined;
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
