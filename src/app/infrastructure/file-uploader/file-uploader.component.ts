import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Subscription, finalize } from 'rxjs';

@Component({
    selector: 'app-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrl: './file-uploader.component.css'
})
export class FileUploaderComponent {
    @Input()
    requiredFileType: string = "image";
    fileName = '';
    uploadSub: Subscription | null = null;

    constructor(private http: HttpClient) { }

    onFileSelected(event?: Event) {
        if (!event) return;

        let files = (event.target as HTMLInputElement).files;
        if (!files) return;

        let file = files[0];
        if (!file) return;

        this.fileName = file.name;
        const formData = new FormData();
        formData.append("thumbnail", file);

        // TODO use env
        const upload$ = this.http.post('http://localhost:8080/api/v1/users/profileImage', formData, {
            reportProgress: true,
            observe: 'events'
        }).pipe(
            finalize(() => this.reset())
        );
    }

    reset() {
        console.log("Uploaded");
        this.uploadSub = null;
    }
}
