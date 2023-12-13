import { TimeSlot } from "../shared/model/time-slot.model";

export interface Reservation {
    price?: number;
    guestNumber?: number;
    requestDate?: Date;
    status?: Status;
    timeSlot?: TimeSlot;
    guestId?: number;
    accommodationId?: number;
}

export enum Status {
    REQUESTED, DECLINED, CANCELLED_REQUEST, CANCELLED_RESERVATION, ACCEPTED
}