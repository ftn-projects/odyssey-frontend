import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountManagementComponent } from './user/account-management/account-management.component';
import { LoginComponent } from './infrastructure/auth/login/login.component';
import { RegistrationComponent } from './infrastructure/auth/registration/registration.component';
import { AccommodationListComponent } from './accommodation/accommodation-list/accommodation-list.component';
import { AccommodationDetailsComponent } from './accommodation/accommodation-details/accommodation-details.component';
import { EmailConfirmationComponent } from './infrastructure/auth/email-confirmation/email-confirmation.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'accommodationList' },
    { path: 'accommodationList', component: AccommodationListComponent },
    { path: 'accommodation/:id', component: AccommodationDetailsComponent },
    { path: 'account', component: AccountManagementComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'emailConfirmation', component: EmailConfirmationComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
