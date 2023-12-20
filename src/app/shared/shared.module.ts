import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../infrastructure/material/material.module';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';



@NgModule({
    declarations: [
        FileUploaderComponent,
        ImageUploaderComponent
    ],
    exports: [
        FileUploaderComponent,
        ImageUploaderComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ]
})
export class SharedModule { }
