import { User } from "../../user/model/user.model";

export class ReviewRequest {
    id?: number;
    rating?: number;
    comment?: string;
    submissionDate?: Date;
    status?: 'REQUESTED' | 'ACCEPTED' | 'DECLINED' | 'REPORTED';
    submitter?: User;
    title?: string;
    type?: 'ACCOMMODATION' | 'HOST';

    constructor(review: any) {
        this.id = review.id;
        this.rating = review.rating;
        this.comment = review.comment;
        this.submissionDate = review.submissionDate;
        this.status = review.status;
        this.submitter = review.submitter;

        if ('accommodation' in review) {
            this.title = review.accommodation?.title;
            this.type = 'ACCOMMODATION';
        }

        else if ('host' in review) {
            this.title = review.host?.name + ' ' + review.host?.surname;
            this.type = 'HOST';
        }
    }
}