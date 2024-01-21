import { User } from "../../user/model/user.model";

export interface Review {
    id?: number;
    rating?: number;
    comment?: string;
    submissionDate?: Date;
    status?: 'REQUESTED' | 'ACCEPTED' | 'DECLINED' | 'REPORTED';
    submitter?: User;
}

