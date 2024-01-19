import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountManagementComponent } from './user/account-management/account-management.component';
import { LoginComponent } from './infrastructure/auth/login/login.component';
import { RegistrationComponent } from './infrastructure/auth/registration/registration.component';
import { AccommodationListComponent } from './accommodation/accommodation-list/accommodation-list.component';
import { AccommodationDetailsComponent } from './accommodation/accommodation-details/accommodation-details.component';
import { EmailConfirmationComponent } from './infrastructure/auth/email-confirmation/email-confirmation.component';
import { AuthGuard } from './infrastructure/auth/auth.guard';
import { AccommodationRequestsComponent } from './accommodation/accommodation-requests/accommodation-requests.component';
import { AccommodationRequestCreateComponent } from './accommodation/accommodation-request-create/accommodation-request-create.component';
import { AccommodationRequestDetailsComponent } from './accommodation/accommodation-request-details/accommodation-request-details.component';
import { AccreditReservationComponent } from './reservation/accredit-reservation/accredit-reservation.component';
import { ReivewManagementComponent } from './review/reivew-management/reivew-management.component';
import { GuestsReservationsComponent } from './reservation/guests-reservations/guests-reservations.component';
import { GuestReviewsComponent } from './review/guest-reviews/guest-reviews.component';
import { HostReviewComponent } from './review/host-review/host-review.component';
import { HostReviewsComponent } from './review/host-reviews/host-reviews.component';
import { UserManagementComponent } from './user/user-management/user-management.component';
import { NotificationListComponent } from './notification/notification-list/notification-list.component';
import { StatsPageComponent } from './stats/stats-page/stats-page.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'accommodations' },
    { path: 'accommodations', component: AccommodationListComponent },
    { path: 'accommodation/details/:id', component: AccommodationDetailsComponent },
    {
        path: 'accommodation/create', component: AccommodationRequestCreateComponent,
        canActivate: [AuthGuard], data: { role: ['HOST'], mode: 'CREATE' }
    },
    {
        path: 'accommodation/edit/:id', component: AccommodationRequestCreateComponent,
        canActivate: [AuthGuard], data: { role: ['HOST'], mode: 'EDIT' }
    },
    {
        path: 'reservations/host', component: AccreditReservationComponent,
        canActivate: [AuthGuard], data: { role: ['HOST'] }
    },
    {
        path: 'accommodationRequests', component: AccommodationRequestsComponent,
        canActivate: [AuthGuard], data: { role: ['ADMIN'] }
    },
    {
        path: 'accommodationRequest/:id', component: AccommodationRequestDetailsComponent,
        canActivate: [AuthGuard], data: { role: ['ADMIN'] }
    },
    {
        path: 'reviewRequests', component: ReivewManagementComponent,
        canActivate: [AuthGuard], data: { role: ['ADMIN'] }
    },
    {
        path: 'users', component: UserManagementComponent,
        canActivate: [AuthGuard], data: { role: ['ADMIN'] }
    },
    {
        path: 'account', component: AccountManagementComponent,
        canActivate: [AuthGuard], data: { role: ['ADMIN', 'HOST', 'GUEST'] }
    },
    {
        path: 'notifications', component: NotificationListComponent,
        canActivate: [AuthGuard], data: { role: ['ADMIN', 'HOST', 'GUEST'] }
    },
    { path: 'reservations/host', component: AccreditReservationComponent },
    { path: 'reservations/guest', component: GuestsReservationsComponent },
    { path: 'reviews/guest', component: GuestReviewsComponent},
    { path: 'reviews/host', component: HostReviewsComponent},
    { path: 'login', component: LoginComponent },
    { path: 'stats', component: StatsPageComponent},
    { path: 'registration', component: RegistrationComponent },
    { path: 'emailConfirmation/:id', component: EmailConfirmationComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
