import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../infrastructure/material/material.module';
import { AccountManagementComponent } from './account-management/account-management.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReviewModule } from '../review/review.module';
import { NotificationsManagementComponent } from './notifications-management/notifications-management.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProfileManagementComponent } from './profile-management/profile-management.component';



@NgModule({
    declarations: [
        AccountManagementComponent,
        UserManagementComponent,
        NotificationsManagementComponent,
        UserProfileComponent,
        ProfileManagementComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        MaterialModule,
        RouterModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        ReviewModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule { }
