export interface Accommodation {
    name: string;
    location: string;
    rating: number;
    distance: string;
    price: number;
    pricingType: 'per night' | 'per guest';
    totalPrice: number;
}