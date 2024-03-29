import { Component, Input } from '@angular/core';
import { Accommodation } from '../accommodation-list/../model/accommodation.model';
import { AccommodationService } from '../accommodation.service';
import { map } from 'rxjs';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from '../../shared/shared.service';
// import FileReader



@Component({
    selector: 'app-accommodation-card',
    templateUrl: './accommodation-card.component.html',
    styleUrl: './accommodation-card.component.css'
})
export class AccommodationCardComponent {
    @Input()
    accommodation!: Accommodation;
    isFavorite: boolean = false;
    constructor(private service: AccommodationService, private authService : AuthService, private snackbar : MatSnackBar,
        private sharedService: SharedService){}
    imageUrl!: string;

    ngOnInit(): void {
        this.service.getImageUrls(this.accommodation.id).subscribe({
          next: (data: string[]) => {
            this.imageUrl = this.service.getImageUrl(this.accommodation.id, data[0]);
          },
          error: (err) => {
            let errorMessage = this.sharedService.getError(err, 'Error while fetching images');
                    this.sharedService.displaySnackWithButton(errorMessage, "OK");
          },
        });
        
        if(this.authService.isLoggedIn() && this.authService.getRole()=="GUEST"){
            this.service.getFavorites(this.authService.getId()).subscribe({
                next: (data: Accommodation[]) => {
                    const listId : number[] = data.map(accommodation => accommodation.id);
                    if(listId.includes(this.accommodation.id)){
                        this.isFavorite=true;
                    }
                    else{
                        this.isFavorite=false;
                    }
                },
                error: (err) => { let errorMessage = this.sharedService.getError(err, 'Error while getting favorites');
                this.sharedService.displaySnackWithButton(errorMessage, "OK");}
            }
            );
        }
      }

      favoriteEvent(event : Event){
        event.stopPropagation();
        this.toggleFavorite();
      }

      toggleFavorite(){
        if(this.authService.isLoggedIn() && this.authService.getRole()=="GUEST"){
            this.sendFavoriteRequest();
        }
        else{
            this.openSnackBar("You need to be logged in as a Guest to favorite accommodations","Close");
        }
      }

      sendFavoriteRequest(){
        this.service.getFavorites(this.authService.getId()).subscribe({
            next: (data: Accommodation[]) => {
                const listId : number[] = data.map(accommodation => accommodation.id);
                if(listId.includes(this.accommodation.id)){
                    this.service.unfavorite(this.authService.getId(),this.accommodation.id).subscribe({
                        next: (data: void) => {
                          this.openSnackBar("Successfully unfavorited accommodation", "Close");
                          this.isFavorite=false;
                        },
                        error: (err) => {
                            let errorMessage = this.sharedService.getError(err, 'Error while unfavoriting accommodations');
                            this.sharedService.displaySnackWithButton(errorMessage, "OK");
                        },
                      });
                }
                else{
                    this.service.favorite(this.authService.getId(),this.accommodation.id).subscribe({
                        next: (data: void) => {
                          this.openSnackBar("Successfully favorited accommodation", "Close");
                          this.isFavorite=true;
                        },
                        error: (err) => {
                          this.openSnackBar("Error while favoriting accommodation", "Close");
                        },
                      });
                }
            },
            error: (err) => { console.log(err);
                let errorMessage = this.sharedService.getError(err, 'Error while getting favorites');
                this.sharedService.displaySnackWithButton(errorMessage, "OK"); }
        })
      }


      openSnackBar(message: string, action: string) {
        this.snackbar.open(message, action);
    }
}
