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
import { AccommodationModificationComponent } from './accommodation/accommodation-modification/accommodation-modification.component';
import { AccommodationRequestDetailsComponent } from './accommodation/accommodation-request-details/accommodation-request-details.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'accommodations' },
    { path: 'accommodations', component: AccommodationListComponent },
    { path: 'accommodation/details/:id', component: AccommodationDetailsComponent },
    {
        path: 'accommodation/create', component: AccommodationModificationComponent,
        canActivate: [AuthGuard], data: { role: ['HOST'], mode: 'CREATE' }
    },
    {
        path: 'accommodation/edit/:id', component: AccommodationModificationComponent,
        canActivate: [AuthGuard], data: { role: ['HOST'], mode: 'EDIT' }
    },
    { path: 'accommodationRequests', component: AccommodationRequestsComponent },
    { path: 'accommodationRequest/:id', component: AccommodationRequestDetailsComponent },
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
