import { User } from "../../user/model/user.model";
import { Review } from "./review.model";

export interface HostReview extends Review {
    host?: User;
}