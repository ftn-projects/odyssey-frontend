import { Accommodation } from "../../accommodation/model/accommodation.model";
import { Review } from "./review.model";

export interface AccommodationReview extends Review {
    discriminator: 'ACOMMODATION_REVIEW';
    accommodation?: Accommodation;
}

export function instanceOfAccommodationReview(object: any): object is AccommodationReview {
    return object.discriminator === 'ACOMMODATION_REVIEW';
}