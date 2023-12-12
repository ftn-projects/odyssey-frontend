import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from '../shared.service';
import { SnackMessage } from './snack-message.model';

@Component({
    selector: 'app-snack',
    template: ''
})
export class SnackComponent {
    constructor(private snack: MatSnackBar, private service: SharedService) {
        this.service.newSnackMessage.subscribe((message: SnackMessage) => {
            if (message.text !== '') {
                this.display(message)
            }
        })
    }

    public display(message: SnackMessage): void {
        this.snack.open(message.text, message.title, { duration: message.duration });
    }
}