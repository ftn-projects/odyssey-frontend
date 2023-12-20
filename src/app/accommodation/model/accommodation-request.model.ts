import { User } from "../../user/model/user.model";
import { Accommodation } from "./accommodation.model";

export interface AccommodationRequest {
    id?: number;
    submissionDate?: Date;
    type?: Type;
    title?: string;
    host?: User;
    details?: Accommodation;
    accommodationId?: number;
}

enum Type {
    CREATE, UPDATE
}