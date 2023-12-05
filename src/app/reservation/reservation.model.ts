import { TimeSlot } from "../accommodation/time-slot.model";

export interface Reservation {
    price?: number;
    guestNumber?: number;
    requestDate?: Date;
    reservationDate?: Date;
    status?: Status;
    timeSlot?: TimeSlot;
    guestId?: number;
    accommodationId?: number;
}

export enum Status {
    REQUESTED, DECLINED, CANCELLED_REQUEST, CANCELLED_RESERVATION, ACCEPTED
}