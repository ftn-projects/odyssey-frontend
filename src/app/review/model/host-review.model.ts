import { User } from "../../user/model/user.model";
import { Review } from "./review.model";

export interface HostReview extends Review {
    discriminator: 'HOST_REVIEW';
    host?: User;
}

export function instanceOfHostReview(object: any): object is HostReview {
    return object.discriminator === 'HOST_REVIEW';
}