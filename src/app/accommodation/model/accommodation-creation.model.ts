import { AvailabilitySlot } from "./availability-slot.model";
import { Address } from "../../shared/model/address.model";
import { Amenity } from "./amenity.model";

export interface AccommodationCreation {
    title: string;
    description: string;
    type: 'APARTMENT' | 'ROOM' | 'HOUSE'; // Assuming type is an enum
    address: Address;
    pricing: 'PER_PERSON' | 'PER_ACCOMMODATION'; // Assuming pricing is an enum
    amenities: Amenity[];
    hostId: number;
    defaultPrice: number; // Change the type accordingly
    automaticApproval: boolean;
    cancellationDue: string;
    availableSlots: AvailabilitySlot[];
    minGuests: number;
    maxGuests: number;
}