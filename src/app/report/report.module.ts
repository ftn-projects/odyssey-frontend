import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserReportsDialogComponent } from './user-reports-dialog/user-reports-dialog.component';



@NgModule({
    declarations: [
        ReportDialogComponent,
        UserReportsDialogComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class ReportModule { }
