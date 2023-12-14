import { AvailabilitySlot } from "./availability-slot.model";
import { Amenity } from "./amenity.model";
import { Address } from "../../shared/model/address.model";
export interface AccommodationCreation {
    id: number;
    title: string;
    description: string;
    type: 'APARTMENT' | 'ROOM' | 'HOUSE'; // Assuming type is an enum
    address: Address;
    pricing: 'PER_PERSON' | 'PER_ACCOMMODATION'; // Assuming pricing is an enum
    amenities: Set<Amenity>;
    host: number;
    defaultPrice: number; // Change the type accordingly
    automaticApproval: boolean;
    cancellationDue: string;
    availableSlots: Set<AvailabilitySlot>;
    minGuests: number;
    maxGuests: number;
    totalPrice: number;
    averageRating: number;
}