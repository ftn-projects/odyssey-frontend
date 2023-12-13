import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';



@NgModule({
    declarations: [
        LoginComponent,
        RegistrationComponent,
        EmailConfirmationComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
    ]
})
export class AuthModule { }
