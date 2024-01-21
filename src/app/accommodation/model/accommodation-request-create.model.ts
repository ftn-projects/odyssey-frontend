import { AvailabilitySlot } from "./availability-slot.model";
import { Address } from "../../shared/model/address.model";
import { Amenity } from "./amenity.model";

export interface AccommodationRequestCreation {
    id?: number;
    requestType?: 'CREATE' | 'UPDATE';
    newTitle?: string;
    newDescription?: string;
    newType?: 'APARTMENT' | 'ROOM' | 'HOUSE';
    newAddress?: Address;
    newPricing?: 'PER_PERSON' | 'PER_NIGHT';
    newDefaultPrice?: number;
    newAutomaticApproval?: boolean;
    newCancellationDue?: number;
    newAvailableSlots?: AvailabilitySlot[];
    newAmenities?: Amenity[];
    newMinGuests?: number;
    newMaxGuests?: number;
    hostId?: number;
    accommodationId?: number;
}