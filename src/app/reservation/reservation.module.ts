import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccreditReservationComponent } from './accredit-reservation/accredit-reservation.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AccreditReservationComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        SharedModule
    ]
})
export class ReservationModule { }
