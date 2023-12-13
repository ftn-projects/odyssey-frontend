import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../infrastructure/material/material.module';
import { AccountManagementComponent } from './account-management/account-management.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
    declarations: [
        AccountManagementComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        MaterialModule,
        RouterModule,
        SharedModule,
        FormsModule
    ]
})
export class UserModule { }
