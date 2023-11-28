import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {ViewChild, ElementRef } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

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

buttonPool: { icon: string; text: string }[] = [
    { icon: 'home', text: 'Home' },
    { icon: 'favorite', text: 'Favorite' },
    { icon: 'star', text: 'Star' },
    { icon: 'person', text: 'Person' },
    { icon: 'attach_money', text: 'Money' },
    { icon: 'flight', text: 'Flight' },
    { icon: 'hotel', text: 'Hotel' },
    { icon: 'restaurant', text: 'Restaurant' },
    { icon: 'local_cafe', text: 'Cafe' },
    { icon: 'shopping_cart', text: 'Shopping' },
    { icon: 'local_movies', text: 'Movies' },
    { icon: 'fitness_center', text: 'Fitness' },
    { icon: 'pets', text: 'Pets' },
    { icon: 'build', text: 'Build' },
    { icon: 'palette', text: 'Palette' },
    { icon: 'local_pharmacy', text: 'Pharmacy' },
    { icon: 'local_hospital', text: 'Hospital' },
    { icon: 'directions_car', text: 'Car' },
    { icon: 'local_gas_station', text: 'Gas Station' },
    { icon: 'directions_run', text: 'Run' },
    { icon: 'bike_scooter', text: 'Bike' },
    { icon: 'waving_hand', text: 'Wave' },
    { icon: 'explore', text: 'Explore' },
    { icon: 'music_note', text: 'Music' },
    { icon: 'school', text: 'School' },
    { icon: 'emoji_events', text: 'Events' },
    { icon: 'public', text: 'Public' },
    { icon: 'wifi', text: 'WiFi' },
    { icon: 'cloud', text: 'Cloud' },
    // Add more items to the button pool as needed
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  buttons: { icon: string; text: string }[] = [];

  scrollDistance: number = 0; // Adjusted dynamically based on container width
  scrollState: number = 0;

  ngAfterViewInit() {
    this.scrollDistance = this.scrollContainer.nativeElement.scrollWidth / this.buttonPool.length;
    this.generateRandomButtons();
  }
    
    generateRandomButtons() {
        const numberOfButtons = 50; // Adjust the number of buttons as needed
    
        this.buttons = Array.from({ length: numberOfButtons }, () => {
          const randomIndex = Math.floor(Math.random() * this.buttonPool.length);
          return this.buttonPool[randomIndex];
        });
        this.cdr.detectChanges();
      }
  
    scroll(direction: number) {
      this.scrollState += direction;
      this.scrollContainer.nativeElement.scrollLeft += direction * this.scrollContainer.nativeElement.offsetWidth;
    }
}
