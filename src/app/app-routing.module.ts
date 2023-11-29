import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './authentification/login/login.component';

const routes: Routes = [
    { component: HomeComponent, path: "home" },
    { component: AccountComponent, path: "account" },
    { component: LoginComponent, path: "login" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
