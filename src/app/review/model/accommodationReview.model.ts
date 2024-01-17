import { Accommodation } from "../../accommodation/model/accommodation.model";
import { Review } from "./review.model";

export interface AccommodationReview extends Review{
    accommodation : Accommodation;
}