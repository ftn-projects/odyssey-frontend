import { User } from "../model/user.model"

const user1: User = {
    id: 1,
    role: 'ADMIN',
    email: 'admin@gmail.com',
    name: 'Marko',
    surname: 'Marković',
    phone: '(+381)69423143',
    address: {
        street: 'Bulevar cara Dušana 34',
        city: 'Novi Sad',
        country: 'Serbia'
    },
    bio: '',
    settings: {
        reservationRequested: false,
        reservationAccepted: false,
        reservationDeclined: false,
        reservationCancelled: false,
        profileReviewed: false,
        accommodationReviewed: false
    }
}

const user2: User = {
    id: 2,
    role: 'HOST',
    email: 'petar@gmail.com',
    name: 'Petar',
    surname: 'Petrović',
    phone: '(+381)63748021',
    address: {
        street: 'Slobodana Jovanovića 8',
        city: 'Kruševac',
        country: 'Serbia'
    },
    bio: 'Živim u Kruševcu i izdajem 2 smeštaja.',
    settings: {
        reservationRequested: true,
        reservationAccepted: false,
        reservationDeclined: false,
        reservationCancelled: true,
        profileReviewed: true,
        accommodationReviewed: true
    }
}

const user3: User = {
    id: 3,
    role: 'GUEST',
    email: 'milos@gmail.com',
    name: 'Miloš',
    surname: 'Milošević',
    phone: '(+381)651859940',
    address: {
        street: 'Svetozara Radojčića 17',
        city: 'Beograd',
        country: 'Serbia'
    },
    bio: '',
    settings: {
        reservationRequested: true,
        reservationAccepted: true,
        reservationDeclined: true,
        reservationCancelled: false,
        profileReviewed: false,
        accommodationReviewed: false
    }
}


export { user1, user2, user3 }

