import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../infrastructure/material/material.module';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';



@NgModule({
    declarations: [
        NotificationListComponent,
        NotificationDialogComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule
    ]
})
export class NotificationModule { }
