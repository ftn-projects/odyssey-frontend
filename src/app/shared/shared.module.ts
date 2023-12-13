import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../infrastructure/material/material.module';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';



@NgModule({
    declarations: [
        FileUploaderComponent
    ],
    exports: [
        FileUploaderComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ]
})
export class SharedModule { }
