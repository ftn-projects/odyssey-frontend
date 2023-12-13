import { TimeSlot } from "../../shared/model/time-slot.model";

export interface AvailabilitySlot extends TimeSlot {
    price: number;
}