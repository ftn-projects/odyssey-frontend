import { AvailabilitySlot } from "./availability-slot.model";
import { Amenity } from "./amenity.model";
import { Address } from "../../shared/model/address.model";
import { User } from "../../user/model/user.model";

export interface Accommodation {
    id: number;
    title: string;
    description: string;
    type: 'APARTMENT' | 'ROOM' | 'HOUSE'; // Assuming type is an enum
    address: Address;
    pricing: 'PER_PERSON' | 'PER_NIGHT'; // Assuming pricing is an enum
    amenities: Amenity[];
    host: User;
    defaultPrice: number; // Change the type accordingly
    automaticApproval: boolean;
    cancellationDue: number;
    availableSlots: AvailabilitySlot[];
    minGuests: number;
    maxGuests: number;
    totalPrice: number;
    averageRating: number;
}