import { Component, Inject, Input, OnInit } from '@angular/core';
import { AccommodationReview } from '../model/accommodationReview.model';
import { UserService } from '../../user/user.service';
import { environment } from '../../../env/env';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { Review } from '../model/review.model';
import { HostReview } from '../model/hostReview.model';
import { ReviewService } from '../review.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-accommodation-review',
  templateUrl: './accommodation-review.component.html',
  styleUrl: './accommodation-review.component.css'
})
export class AccommodationReviewComponent implements OnInit{
    private userStringPath: string = environment.apiHost + 'users';
    @Input() review!: Review;
    submitterImageSrc! : string;
    hostMode: boolean = false;
    guestMode: boolean = false;
    reportSuccess: boolean = false;
    deleteSuccess: boolean = false;

    constructor(
        private authService : AuthService,
        private reviewService : ReviewService,
        private snackbar : MatSnackBar,
        private dialog : MatDialog
    ) { 
        
    }

    ngOnInit(): void {
        if(this.review && this.review.submitter){
            this.submitterImageSrc = `${environment.apiHost}users/image/${this.review.submitter.id}`;
            this.guestMode = this.review.submitter?.id == this.authService.getId();
        }

        if(this.isAccommodationReview(this.review)){
            this.hostMode = this.authService.getId() == this.review.accommodation?.host?.id;
        }
        if(this.isHostReview(this.review)){
            this.hostMode = this.authService.getId() == this.review.host?.id;
        }
    }


    isAccommodationReview(review: Review): review is AccommodationReview {
        return 'accommodation' in review;
      }
      
      isHostReview(review: Review): review is HostReview {
        return 'host' in review;
      }


    deleteReview() : void {
        const dialogData = {
            message: 'Are you sure you want to delete this review?',
            buttonText: {
              ok: 'Yes',
              cancel: 'No'
            }
          };
        
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: dialogData
          });
        
          dialogRef.afterClosed().subscribe(dialogResult => {
            if(dialogResult) {
              this.handleDeleteReview();
            }
          });
    }


    reportReview() : void {
        const dialogData = {
            message: 'Are you sure you want to report this review?',
            buttonText: {
              ok: 'Yes',
              cancel: 'No'
            }
          };
        
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: dialogData
          });
        
          dialogRef.afterClosed().subscribe(dialogResult => {
            if(dialogResult) {
              this.handleReportReview();
            }
          });
    }
      
    handleReportReview() : void {
        if(this.isAccommodationReview(this.review)){
            this.reviewService.reportAccommodationReview(this.review.id).subscribe({
                next: (data : void) => {
                    this.openSnackBar("Review reported!", "Close");
                    this.reportSuccess = true;
                },
                error: (error) => {
                    this.openSnackBar('Error reporting review:', "Close");
                }
            });
        }
        if(this.isHostReview(this.review)){
            this.reviewService.reportHostReview(this.review.id).subscribe({
                next: (data : void) => {
                    this.openSnackBar("Review reported!", "Close");
                    this.reportSuccess = true;
                },
                error: (error) => {
                    this.openSnackBar('Error reporting review:', "Close");
                }
            });
        }
    }

    handleDeleteReview() : void {
        if(this.isAccommodationReview(this.review)){
            this.reviewService.deleteAccommodationReview(this.review.id).subscribe({
                next: (data : void) => {
                    this.openSnackBar("Review deleted!", "Close");
                    this.deleteSuccess = true;
                },
                error: (error) => {
                    this.openSnackBar('Error deleting review:', "Close");
                }
            });
        }
        if(this.isHostReview(this.review)){
            this.reviewService.deleteHostReview(this.review.id).subscribe({
                next: (data : void) => {
                    this.openSnackBar("Review deleted!", "Close");
                    this.deleteSuccess = true;
                },
                error: (error) => {
                    this.openSnackBar('Error deleting review:', "Close");
                }
            });
        }
    }
    openSnackBar(message: string, action: string) {
        this.snackbar.open(message, action);
    }

}
