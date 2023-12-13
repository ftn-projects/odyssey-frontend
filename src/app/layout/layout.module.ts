import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from '../infrastructure/material/material.module';



@NgModule({
    declarations: [
        NavBarComponent
    ],
    exports: [
        NavBarComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule
    ]
})
export class LayoutModule { }
