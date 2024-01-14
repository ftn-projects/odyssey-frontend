import { User } from "../../user/model/user.model";

export interface UserReport {
    id?: number;
    description?: string;
    submissionDate?: Date;
    submitter?: User;
    reported?: User;
}