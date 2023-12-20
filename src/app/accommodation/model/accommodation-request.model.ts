export interface AccommodationRequest {
    id?: number;
    submissionDate?: Date;
    type?: Type;
    title?: string;
    host?: string;
    accommodationId?: number;

}

enum Type {
    CREATE, UPDATE
}