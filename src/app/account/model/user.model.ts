export class User{
    id: number = 0;
    role: Role = Role.GUEST;
    email: string = '';
    name: string = '';
    surname: string = '';
    phone: string = '';
    address: Address = new Address();
    settings: Settings = new Settings();
    bio: string = '';
    
}


export enum Role {
    ADMIN = 'ADMIN',
    HOST = 'HOST',
    GUEST = 'GUEST'
}

export class Address {
    street: string = '';
    number: string = '';
    city: string = '';
    country: string = '';
}

export class Settings {
    ReservationNotification_On: Boolean = false;
    HostNotification_On: Boolean = false;
}