import { TimeSlot } from "../shared/model/time-slot.model";
import { Status } from "./reservation.model";

export interface ReservationRequest {
    id?: number,
    price?: number;
    guestNumber?: number;
    requestDate?: Date;
    timeSlot?: TimeSlot;
    accommodationId?: number;
    guestId?: number;
}