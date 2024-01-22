import { Component, OnInit } from '@angular/core';
import { AccommodationService } from '../accommodation.service';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { Accommodation } from '../model/accommodation.model';

@Component({
  selector: 'app-host-accommodations-view',
  templateUrl: './host-accommodations-view.component.html',
  styleUrl: './host-accommodations-view.component.css'
})
export class HostAccommodationsViewComponent implements OnInit{
    accommodations: Accommodation[] = [];

    constructor(
        private accommodationService: AccommodationService,
        private authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.accommodationService.getByHostId(this.authService.getId()).subscribe({
            next: (data: Accommodation[]) => {
                this.accommodations = data;
            },
            error: (err) => { console.log(err) }
        })
    }
}
