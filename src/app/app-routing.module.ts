import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './authentification/login/login.component';
import { RegistrationComponent } from './authentification/registration/registration.component';
import { AccommodationListComponent } from './accommodation-list/accommodation-list.component';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';

const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "accommodation-list" },
    { component: AccommodationListComponent, path: "accommodation-list" },
    { component: AccommodationDetailsComponent, path: "accommodation-details" },
    { component: AccountComponent, path: "account" },
    { component: LoginComponent, path: "login" },
    { component: RegistrationComponent, path: "registration" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
