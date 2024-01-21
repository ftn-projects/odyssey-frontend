import { Accommodation } from "../accommodation/model/accommodation.model";
import { User } from "../user/model/user.model";

export interface AccreditReservation {
    id?: number,
    price?: number;
    guestNumber?: number;
    cancellationNumber?: number;
    status?: 'REQUESTED' | 'ACCEPTED' | 'DECLINED' | 'CANCELLED_REQUEST' | 'CANCELLED_RESERVATION',
    requestDate?: Date;
    start?: Date;
    end?: Date;
    accommodation?: Accommodation;
    guest?: User;
}