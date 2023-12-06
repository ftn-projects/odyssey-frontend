import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FileUploaderComponent } from './file-uploader.component';



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
export class FileUploaderModule { }
