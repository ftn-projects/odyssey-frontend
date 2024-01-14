import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        ReportDialogComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class ReportModule { }
