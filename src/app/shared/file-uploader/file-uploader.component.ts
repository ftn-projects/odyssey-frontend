import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Subscription, finalize } from 'rxjs';
import { environment } from '../../../env/env';
import { FileService } from '../file.service';

@Component({
    selector: 'app-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrl: './file-uploader.component.css'
})
export class FileUploaderComponent {
    @Input()
    requiredFileType: string = "image";
    @Input()
    endpoint: string = '';
    @Input()
    paramName: string = 'image';
    @Input()
    multiple: boolean = false;
    @Input()
    text: string = 'Upload file';

    protected progress = 0;
    protected message = '';
    protected fileName = '';

    constructor(private service: FileService) {
    }

    onFileSelected(event?: Event) {
        if (!event) return;

        let files = (event.target as HTMLInputElement).files;
        if (!files) return;

        for (const file of files) {
            this.fileName = file.name;
            this.service.upload(file, this.endpoint, this.paramName).subscribe({
                next: (event: any) => {
                    if (event.type === HttpEventType.UploadProgress) {
                        this.progress = Math.round(100 * event.loaded / event.total);
                    } else if (event instanceof HttpResponse) {
                        this.message = event.body.message;
                    }
                },
                error: (err: any) => {
                    console.log(err);
                    this.progress = 0;

                    if (err.error && err.error.message) {
                        this.message = err.error.message;
                    } else {
                        this.message = 'Could not upload the file!';
                    }
                }
            });
        }
    }
}
