import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-image-uploader',
    templateUrl: './image-uploader.component.html',
    styleUrl: './image-uploader.component.css'
})
export class ImageUploaderComponent {
    @Input()
    text: string = 'Upload image';
    @Output()
    newImageEvent = new EventEmitter<File[]>();

    protected message = '';
    protected imageName = '';

    onImagesSelected(event?: Event) {
        if (!event) return;

        let selected = (event.target as HTMLInputElement).files;
        if (!selected) return;


        for (let file of selected)
            if (!file.type.startsWith('image/'))
                throw Error('Only image formats can be uploaded.');

        this.newImageEvent.emit(Array.from(selected));
    }
}
