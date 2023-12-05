export interface Reservation {
    price?: number;
    guestNumber?: number;
    requestDate?: Date;
    reservationDate?: Date;
    status?: Status;
    timeSlot?: number; //bice TimeSlot nakon merge
    guestId?: number;
    accommodationId?: number;
}

export enum Status {
    REQUESTED, DECLINED, CANCELLED_REQUEST, CANCELLED_RESERVATION, ACCEPTED
}