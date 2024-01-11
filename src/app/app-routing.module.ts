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
        path: 'account', component: AccountManagementComponent,
        canActivate: [AuthGuard], data: { role: ['ADMIN', 'HOST', 'GUEST'] }
    },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'emailConfirmation/:id', component: EmailConfirmationComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
