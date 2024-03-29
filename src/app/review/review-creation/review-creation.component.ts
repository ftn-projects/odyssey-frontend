import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../review.service';
import { UserService } from '../../user/user.service';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { User } from '../../user/model/user.model';
import { Accommodation } from '../../accommodation/model/accommodation.model';
import { AccommodationService } from '../../accommodation/accommodation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccommodationReviewComponent } from '../accommodation-review/accommodation-review.component';
import { HostReview } from '../model/hostReview.model';
import { AccommodationReview } from '../model/accommodationReview.model';
import { SharedService } from '../../shared/shared.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-review-creation',
    templateUrl: './review-creation.component.html',
    styleUrl: './review-creation.component.css'
})
export class ReviewCreationComponent implements OnInit {
    @Input() type?: string;
    @Input() id?: number;
    loggedUser?: User;
    accommodation?: Accommodation;
    host?: User;
    reviewForm: FormGroup = null as any;


    onRatingChanged(rating: number): void {
        if (!this.reviewForm) return;
        this.reviewForm.get('rating')?.setValue(rating);
    }

    constructor(
        private reviewService: ReviewService,
        private userService: UserService,
        private authService: AuthService,
        private accommodationService: AccommodationService,
        private sharedService: SharedService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.reviewForm = this.formBuilder.group({
            rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
            comment: [null, [Validators.maxLength(500)]],
        });
    }

    get formComment() { return this.reviewForm.get('comment'); }

    get formRating() { return this.reviewForm.get('rating'); }



    onSubmit(): void {
        if (!this.authService.isLoggedIn()) return;

        this.userService.findById(this.authService.getId()).subscribe({
            next: (data: User) => {
                this.loggedUser = data;

                if (!this.id) return;
                if (!this.type) return;

                if (this.type == 'ACCOMMODATION') {
                    this.accommodationService.getById(this.id).subscribe({
                        next: (data: Accommodation) => {
                            this.accommodation = data;
                            this.sendReview();
                        },
                        error: (error) => {
                            console.log('Error getting the accommodation', error);
                            this.sharedService.displaySnackWithButton('Something went wrong.', "OK");
                        }
                    });
                }
                else if (this.type == 'HOST') {
                    this.userService.findById(this.id).subscribe({
                        next: (data: User) => {
                            this.host = data;
                            this.sendReview();
                        },
                        error: (error) => {
                            console.log('Error getting the host', error);
                            this.sharedService.displaySnackWithButton('Something went wrong.', "OK");
                        }
                    });
                }
                else {
                    console.log('Error: Invalid type');
                }
            },
            error: (error) => {
                console.error('Error getting the logged user', error);
            }
        });
    }

    sendReview(): void {
        if (this.type == 'ACCOMMODATION') {
            if (!this.accommodation) return;
            const accommodationReview: AccommodationReview = {
                rating: this.reviewForm.get('rating')?.value,
                comment: this.reviewForm.get('comment')?.value,
                accommodation: this.accommodation,
                submitter: this.loggedUser,
                submissionDate: new Date(),
                status: 'REQUESTED'
            };


            this.reviewService.createAccommodationReview(accommodationReview).subscribe({
                next: (data: AccommodationReview) => {
                    console.log('Review sent', data);
                    this.sharedService.displaySnack('Review submitted!');
                },
                error: (error) => {
                    this.sharedService.displaySnackWithButton(error.error, "OK");
                    console.log('Error sending the review', error);
                    
                    
                }
            });
        }
        else if (this.type == 'HOST') {
            if (!this.host) return;
            console.log(this.loggedUser)
            const hostReview: HostReview = {
                rating: this.reviewForm.get('rating')?.value,
                comment: this.reviewForm.get('comment')?.value,
                host: this.host,
                submitter: this.loggedUser,
                submissionDate: new Date(),
                status: 'REQUESTED'
            };

            this.reviewService.createHostReview(hostReview).subscribe({
                next: (data: HostReview) => {
                    console.log('Review sent', data);
                },
                error: (error) => {
                    let errorMessage = this.sharedService.getError(error, 'Error while sending review');
                    this.sharedService.displaySnackWithButton(errorMessage, "OK");
                }
            });

        }
        else {
            console.log('Error: Invalid type');
        }
    }

}
