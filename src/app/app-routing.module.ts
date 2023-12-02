import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './authentification/login/login.component';
import { RegistrationComponent } from './authentification/registration/registration.component';
import { AccommodationListComponent } from './accommodation-list/accommodation-list.component';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'accommodationList' },
    { path: 'accommodationList', component: AccommodationListComponent },
    { path: 'accommodationDetails', component: AccommodationDetailsComponent },
    // { path: 'accommodation', AccommodationsModule.loadChildren() },
    { path: 'account', component: AccountComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
