import { TimeSlot } from "./time-slot.model";

export interface AvailabilitySlot extends TimeSlot {
    price: number;
}