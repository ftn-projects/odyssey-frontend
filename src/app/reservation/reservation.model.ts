import { TimeSlot } from "../shared/model/time-slot.model";

export interface Reservation {
    price?: number;
    guestNumber?: number;
    requestDate?: Date;
    status?: 'REQUESTED' | 'ACCEPTED' | 'DECLINED' | 'CANCELLED_REQUEST' | 'CANCELLED_RESERVATION',
    timeSlot?: TimeSlot;
    guestId?: number;
    accommodationId?: number;
}