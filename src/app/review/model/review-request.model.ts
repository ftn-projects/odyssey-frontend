import { User } from "../../user/model/user.model";
import { instanceOfAccommodationReview } from "./accommodation-review.model";
import { instanceOfHostReview } from "./host-review.model";
import { Review } from "./review.model";

export class ReviewRequest implements Review {
    id?: number;
    rating?: number;
    comment?: string;
    submissionDate?: Date;
    status?: 'REQUESTED' | 'ACCEPTED' | 'DECLINED';
    submitter?: User;
    title?: string;
    type?: 'ACCOMMODATION' | 'HOST';

    constructor(review: Review) {
        this.id = review.id;
        this.rating = review.rating;
        this.comment = review.comment;
        this.submissionDate = review.submissionDate;
        this.status = review.status;
        this.submitter = review.submitter;

        if (instanceOfAccommodationReview(review)) {
            this.title = review.accommodation?.title;
            this.type = 'ACCOMMODATION';
        }

        else if (instanceOfHostReview(review)) {
            this.title = review.host?.name || '' + review.host?.surname || '';
            this.type = 'HOST';
        }
    }
}