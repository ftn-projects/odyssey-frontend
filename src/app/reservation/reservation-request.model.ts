import { TimeSlot } from "../shared/model/time-slot.model";

export interface ReservationRequest {
    id?: number,
    price?: number;
    guestNumber?: number;
    requestDate?: Date;
    timeSlot?: TimeSlot;
    accommodationId?: number;
    guestId?: number;
}