import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccreditReservationComponent } from './accredit-reservation/accredit-reservation.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuestsReservationsComponent } from './guests-reservations/guests-reservations.component';

@NgModule({
    declarations: [
        AccreditReservationComponent,
        GuestsReservationsComponent
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
