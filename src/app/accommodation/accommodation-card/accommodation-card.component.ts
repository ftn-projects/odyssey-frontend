import { Component, Input } from '@angular/core';
import { Accommodation } from '../accommodation-list/../model/accommodation.model';
import { AccommodationService } from '../accommodation.service';
import { map } from 'rxjs';
// import FileReader



@Component({
    selector: 'app-accommodation-card',
    templateUrl: './accommodation-card.component.html',
    styleUrl: './accommodation-card.component.css'
})
export class AccommodationCardComponent {
    @Input()
    accommodation!: Accommodation;
    constructor(private service: AccommodationService){}
    imageUrl!: string;

    ngOnInit(): void {
        this.service.getImageUrls(this.accommodation.id).subscribe({
          next: (data: string[]) => {
            this.imageUrl = this.service.getImageUrl(this.accommodation.id, data[0]);
          },
          error: (err) => {
            console.error('Error fetching image URLs:', err);
          },
        });
      }
}
