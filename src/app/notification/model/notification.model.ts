import { AccreditReservation } from "../../reservation/accredit-reservation.model";
import { AccommodationReview } from "../../review/model/accommodation-review.model";
import { HostReview } from "../../review/model/host-review.model";
import { User } from "../../user/model/user.model";

export class Notification {
    id?: number;
    title?: string;
    shortTitle?: string;
    text?: string;
    shortText?: string;
    date?: Date;
    read?: boolean;
    receiver?: User;
    reservation?: AccreditReservation;
    accommodationReview?: AccommodationReview;
    hostReview?: HostReview;

    constructor(notification: any) {
        this.id = notification.id;
        this.title = notification.title;
        this.shortTitle = notification.title.length > 10 ? notification.title.substring(0, 20) + '...' : notification.title;
        this.text = notification.text;
        this.shortText = notification.text.length > 10 ? notification.text.substring(0, 30) + '...' : notification.text;
        this.date = notification.date;
        this.read = notification.read;
        this.receiver = notification.receiver;
        this.reservation = notification.reservation;
        this.accommodationReview = notification.accommodationReview;
        this.hostReview = notification.hostReview;
    }
}