import { DatePipe } from "@angular/common";
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
    type?: 'GENERIC' | 'ACCOMMODATION_REVIEW' | 'HOST_REVIEW' |
        'RESERVATION_REQUESTED' | 'RESERVATION_ACCEPTED' |
        'RESERVATION_DECLINED' | 'RESERVATION_CANCELLED';
    receiver?: User;
    reservation?: AccreditReservation;
    accommodationReview?: AccommodationReview;
    hostReview?: HostReview;

    private datepipe: DatePipe = new DatePipe('en-US')

    constructor(notification: any) {
        this.id = notification.id;
        this.title = notification.title;
        this.shortTitle = notification.title.length > 20 ? notification.title.substring(0, 20) + '...' : notification.title;
        this.date = notification.date;
        this.read = notification.read;
        this.type = notification.type;
        this.receiver = notification.receiver;
        this.reservation = notification.reservation;
        this.accommodationReview = notification.accommodationReview;
        this.hostReview = notification.hostReview;

        let text = notification.text;
        if (this.type === 'ACCOMMODATION_REVIEW')
            text = `Rating: ${this.accommodationReview!.rating}, Comment: ${this.accommodationReview!.comment}`;
        else if (this.type === 'HOST_REVIEW')
            text = `Rating: ${this.hostReview!.rating}, Comment: ${this.hostReview!.comment}`;
        else if (['RESERVATION_REQUESTED', 'RESERVATION_ACCEPTED', 'RESERVATION_DECLINED', 'RESERVATION_CANCELLED'].includes(this.type!))
            text = `Start: ${this.datepipe.transform(this.reservation!.start, 'dd-MM-yyyy')}, ` +
                `End: ${this.datepipe.transform(this.reservation!.end, 'dd-MM-yyyy')}, ` +
                `Price: ${this.reservation!.price}, Guests: ${this.reservation!.guestNumber}`
        else this.text = notification.text;

        this.shortText = text.length > 30 ? text.substring(0, 30) + '...' : text;
    }
}