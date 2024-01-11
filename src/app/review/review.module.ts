import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReivewManagementComponent } from './reivew-management/reivew-management.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        ReivewManagementComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class ReviewModule { }
