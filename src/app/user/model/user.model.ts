import { Address } from "../../shared/model/address.model";
import { UserSettings } from "./user-settings.model";

export interface User {
    id?: number;
    role?: string;
    email?: string;
    name?: string;
    surname?: string;
    phone?: string;
    address: Address;
    bio?: string;
    settings?: UserSettings;
}