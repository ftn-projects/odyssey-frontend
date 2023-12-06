import { Address } from "../../infrastructure/address.model";
import { UserSettings } from "./user-settings.model";

export interface User {
    id?: number;
    role?: UserRole;
    email?: string;
    name?: string;
    surname?: string;
    phone?: string;
    address: Address;
    bio?: string;
    settings?: UserSettings;
}

export enum UserRole {
    Admin, Host, Guest
}