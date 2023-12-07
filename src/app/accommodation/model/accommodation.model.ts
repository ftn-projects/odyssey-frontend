import { Address, User } from "../../account/model/user.model";
import { AvailabilitySlot } from "./availability-slot.model";
import { Amenity } from "./amenity.model";

export interface Accommodation {
    id: number;
    title: string;
    description: string;
    type: 'APARTMENT' | 'ROOM' | 'HOUSE'; // Assuming type is an enum
    address: Address;
    pricing: 'PER_PERSON' | 'PER_ACCOMMODATION'; // Assuming pricing is an enum
    amenities: Set<Amenity>;
    host: User;
    defaultPrice: number; // Change the type accordingly
    automaticApproval: boolean;
    cancellationDue: string; // Assuming Duration is represented as a string
    availableSlots: Set<AvailabilitySlot>;
    minGuests: number;
    maxGuests: number;
    totalPrice: number;
    averageRating: number;
}