export interface Amenity {
    id?: number;
    title?: string;
}

export interface AmenityView extends Amenity {
    icon?: string;
    selected?: boolean;
}