import { User } from "../../../user/model/user.model";

export interface RegisteredUser extends User {
    password?: string;
}
