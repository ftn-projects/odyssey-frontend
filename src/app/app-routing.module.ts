import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountManagementComponent } from './user/account-management/account-management.component';
import { LoginComponent } from './infrastructure/auth/login/login.component';
import { RegistrationComponent } from './infrastructure/auth/registration/registration.component';
import { AccommodationListComponent } from './accommodation/accommodation-list/accommodation-list.component';
import { AccommodationDetailsComponent } from './accommodation/accommodation-details/accommodation-details.component';
import { EmailConfirmationComponent } from './infrastructure/auth/email-confirmation/email-confirmation.component';
import { AuthGuard } from './infrastructure/auth/auth.guard';
import { AccommodationCreateComponent } from './accommodation/accommodation-create/accommodation-create.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'accommodationList' },
    { path: 'accommodationList', component: AccommodationListComponent },
    { path: 'accommodation/:id', component: AccommodationDetailsComponent },
    {
        path: 'accommodationCreate', component: AccommodationCreateComponent,
        canActivate: [AuthGuard], data: { role: ['HOST'] }
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
