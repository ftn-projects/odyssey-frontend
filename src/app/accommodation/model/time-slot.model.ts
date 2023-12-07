export interface TimeSlot {
    start: Date;
    end: Date;
}

export function isOverlap(first: TimeSlot, second: TimeSlot): boolean {
    return (first.start < second.end && first.end > second.start);
}