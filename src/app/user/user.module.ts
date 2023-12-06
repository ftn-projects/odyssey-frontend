import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../infrastructure/material/material.module';
import { AccountManagementComponent } from './account-management/account-management.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FileUploaderModule } from '../infrastructure/file-uploader/file-uploader.module';
import { FormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        AccountManagementComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        MaterialModule,
        RouterModule,
        FileUploaderModule,
        FormsModule
    ]
})
export class AccountModule { }
