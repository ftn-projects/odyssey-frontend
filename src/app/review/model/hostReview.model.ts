import { Review } from "./review.model";
import { User } from "../../user/model/user.model";


export interface HostReview extends Review{
    host: User;
}