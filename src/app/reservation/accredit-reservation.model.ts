import { Accommodation } from "../accommodation/model/accommodation.model";
import { User } from "../user/model/user.model";
import { Status } from "./reservation.model";

export interface AccreditReservation {
    id?: number,
    price?: number;
    guestNumber?: number;
    cancellationNumber?: number;
    status?: Status;
    requestDate?: Date;
    start?: Date;
    end?: Date;
    accommodation?: Accommodation;
    guest?: User;
}