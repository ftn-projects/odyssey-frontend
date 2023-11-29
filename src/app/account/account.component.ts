import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Subscription, finalize } from 'rxjs';
import { Country } from '@angular-material-extensions/select-country';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrl: './account.component.css'
})
export class AccountComponent {
    @Input()
    requiredFileType: string = "image";
    fileName = '';
    uploadSub: Subscription | null = null;

    editingImage = false;
    editingInfo = false;
    editingAbout = false;
    editingAddress = false;
    editingPassword = false;
    onImageSaveToggle() {
        this.displaySnack('Image saved!');
        this.editingImage = false;
    }
    onInfoSaveToggle() {
        this.displaySnack('Info saved!');
        this.editingInfo = false;
    }
    onAboutSaveToggle() {
        this.displaySnack('About saved!');
        this.editingAbout = false;
    }
    onAddressSaveToggle() {
        this.displaySnack('Address saved!');
        this.editingAddress = false;
    }
    onPasswordSaveToggle() {
        this.displaySnack('Password saved!');
        this.editingPassword = false;
    }
    private displaySnack(text: string) {
        this.snackbar.open(text, '', { duration: 1000 });
    }
    deactivateAccount() {
        // deactivate
    }

    selectedCountry: Country = { alpha2Code: "RS" };
    onCountrySelected(country: Country) { console.log("Country changed", country); }

    selectedCallingCode: Country = { alpha2Code: "RS" };
    onCallingCodeSelected(country: Country) { console.log("Calling code changed", country); }

    constructor(private http: HttpClient, private snackbar: MatSnackBar) { }
    onFileSelected(event?: Event) {
        if (!event) return;

        let files = (event.target as HTMLInputElement).files;
        if (!files) return;

        let file = files[0];
        if (!file) return;

        this.fileName = file.name;
        const formData = new FormData();
        formData.append("thumbnail", file);

        // const upload$ = this.http.post("/api/profile-image-upload", formData, {
        //     reportProgress: true,
        //     observe: 'events'
        // }).pipe(
        //     finalize(() => this.reset())
        // );
    }

    reset() {
        this.uploadSub = null;
    }
}