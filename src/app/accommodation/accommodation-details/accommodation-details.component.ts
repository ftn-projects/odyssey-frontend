import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Accommodation } from '../model/accommodation.model';
import { AccommodationService } from '../accommodation.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-accommodation-details',
    templateUrl: './accommodation-details.component.html',
    styleUrls: ['./accommodation-details.component.css']
  })
  export class AccommodationDetailsComponent {
    id!: number;
    accommodation!: Observable<Accommodation>;
    reservationDetails: FormGroup;
    totalPrice!: number;
    numberOfDays!: number;
  
    constructor(
      private route: ActivatedRoute,
      private service: AccommodationService,
      private cdr: ChangeDetectorRef
    ) {
      this.reservationDetails = new FormGroup({
        dateRange: new FormGroup({
          start: new FormControl<Date | null>(null),
          end: new FormControl<Date | null>(null)
        }),
        guestGroup: new FormGroup({
          guests: new FormControl(0)
        })
      });
    }
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.id = params['id'];
        this.accommodation = this.service.getById(this.id);
      });
  
      this.reservationDetails.valueChanges.subscribe(() => {
        this.calculateTotalPrice();
      });
    }
  
    calculateTotalPrice() {
      this.accommodation.subscribe((accommodation: Accommodation) => {
        const pricingType = accommodation.pricing;
        const startDate = this.reservationDetails.get('dateRange.start')?.value;
        const endDate = this.reservationDetails.get('dateRange.end')?.value;
        const numberOfDays = this.calculateNumberOfDays(startDate, endDate);
        this.numberOfDays = numberOfDays;
        const guests = this.reservationDetails.get('guestGroup.guests')?.value;
  
        let totalPrice: number;
        console.log("Days: " + numberOfDays);
        console.log("Guests: " + guests);
        if (pricingType === 'PER_PERSON') {
          totalPrice = numberOfDays * accommodation.defaultPrice * guests;
        } else {
          totalPrice = numberOfDays * accommodation.defaultPrice;
        }
  
        // Update the total price property in the accommodation object
        this.totalPrice = totalPrice;
  
        // Manually trigger change detection
        this.detectChanges();
      });
    }
  
    private detectChanges() {
      this.cdr.detectChanges();
    }
  
    calculateNumberOfDays(start: Date | null, end: Date | null): number {
      if (!start || !end) {
        return 0;
      }
  
      // Calculate the time difference in milliseconds
      const timeDifference = end.getTime() - start.getTime();
  
      // Calculate the number of days
      const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
  
      return numberOfDays;
    }
  }