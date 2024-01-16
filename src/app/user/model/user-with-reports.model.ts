import { environment } from "../../../env/env";
import { UserReport } from "../../report/model/user-report.model";
import { Address } from "../../shared/model/address.model";
import { UserSettings } from "./user-settings.model";
import { User } from "./user.model";

export class UserWithReports implements User {
    id?: number;
    role?: string;
    email?: string;
    name?: string;
    surname?: string;
    phone?: string;
    address: Address;
    bio?: string;
    settings?: UserSettings;
    status?: 'PENDING' | 'ACTIVE' | 'BLOCKED' | 'DEACTIVATED';
    image?: string;
    reports?: UserReport[];

    constructor(user: any) {
        this.id = user.id;
        this.role = user.role;
        this.email = user.email;
        this.name = user.name;
        this.surname = user.surname;
        this.phone = user.phone;
        this.address = user.address;
        this.bio = user.bio;
        this.settings = user.settings;
        this.status = user.status;
        this.image = `${environment.apiHost}users/image/${user.id}`;
        this.reports = user.reports;
    }
}