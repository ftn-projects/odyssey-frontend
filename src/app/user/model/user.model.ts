import { Address } from "../../shared/model/address.model";

export interface User {
    id?: number;
    role?: string;
    email?: string;
    name?: string;
    surname?: string;
    phone?: string;
    address: Address;
    bio?: string;
    settings?: NotificationSettings;
}

export interface NotificationSettings {
    reservationRequested?: boolean;
    reservationAccepted?: boolean;
    reservationDeclined?: boolean;
    reservationCancelled?: boolean;
    profileReviewed?: boolean;
    accommodationReviewed?: boolean;
}