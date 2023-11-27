import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-button-bar',
  templateUrl: './button-bar.component.html',
  styleUrl: './button-bar.component.css',
  animations: [
    trigger('scrollAnimation', [
      transition(':increment', [
        style({ transform: 'translateX(0)' }),
        animate('500ms ease-out', style({ transform: 'translateX(-100%)' })),
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(0)' }),
        animate('500ms ease-out', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class ButtonBarComponent {
    @ViewChild('scrollContainer') scrollContainer!: ElementRef;

    buttons = Array.from({ length: 50 });
    scrollDistance = 200; // Adjust as needed
    scrollState: number = 0;
  
    scroll(direction: number) {
      this.scrollState += direction;
      this.scrollContainer.nativeElement.scrollLeft += direction * this.scrollContainer.nativeElement.offsetWidth;
    }
}
