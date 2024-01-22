import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegistrationComponent', () => {
    let component: RegistrationComponent;
    let fixture: ComponentFixture<RegistrationComponent>;
    let element: HTMLElement;
    let httpClient: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                HttpClientModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserModule,
                RouterModule,
                CommonModule,
                MaterialModule,
                RouterTestingModule,
                BrowserAnimationsModule],
            declarations: [RegistrationComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(RegistrationComponent);
        component = fixture.componentInstance;
        httpClient = TestBed.inject(HttpTestingController);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should hide password', () => {
        expect(component.hidePassword).toBeTrue();
    });

    it('should hide confirmed password', () => {
        expect(component.hideConfirmedPassword).toBeTrue();
    });

    it('should select role guest', () => {
        expect(component.selectedRole).toEqual('GUEST');
    });

    it('should call onRegister when button is clicked', () => {
        spyOn(component, 'onRegister');
        element = fixture.debugElement.query(By.css('button')).nativeElement;
        element.click();
        expect(component.onRegister).toHaveBeenCalledTimes(1);

    });

    it('form should be invalid due to empty fields', () => {
        component.registrationForm.controls['email'].setValue('');
        component.registrationForm.controls['name'].setValue('');
        component.registrationForm.controls['surname'].setValue('');
        component.registrationForm.controls['street'].setValue('');
        component.registrationForm.controls['city'].setValue('');
        component.registrationForm.controls['country'].setValue('');
        component.registrationForm.controls['phone'].setValue('');
        component.registrationForm.controls['password'].setValue('');
        component.registrationForm.controls['confirmedPassword'].setValue('');
        expect(component.registrationForm.valid).toBeFalsy();
    });

    it('form should be invalid due to invalid fields', () => {
        component.registrationForm.controls['email'].setValue('asd');
        component.registrationForm.controls['name'].setValue('123');
        component.registrationForm.controls['surname'].setValue('123');
        component.registrationForm.controls['street'].setValue('--');
        component.registrationForm.controls['city'].setValue('123');
        component.registrationForm.controls['country'].setValue('123');
        component.registrationForm.controls['phone'].setValue('asd');
        component.registrationForm.controls['password'].setValue('12');
        component.registrationForm.controls['confirmedPassword'].setValue('34');
        expect(component.registrationForm.valid).toBeFalsy();
    });

    it('form should be valid', () => {
        component.registrationForm.controls['email'].setValue('asd@gmail.com');
        component.registrationForm.controls['name'].setValue('Nikola');
        component.registrationForm.controls['surname'].setValue('Nikolic');
        component.registrationForm.controls['street'].setValue('Ulica 15');
        component.registrationForm.controls['city'].setValue('Grad');
        component.registrationForm.controls['country'].setValue('Srbija');
        component.registrationForm.controls['phone'].setValue('12345678');
        component.registrationForm.controls['password'].setValue('sifra123');
        component.registrationForm.controls['confirmedPassword'].setValue('sifra123');
        expect(component.registrationForm.valid).toBeTruthy();
    });

    it('should not register account due to empty fields', () => {
        component.registrationForm.controls['email'].setValue('');
        component.registrationForm.controls['name'].setValue('');
        component.registrationForm.controls['surname'].setValue('');
        component.registrationForm.controls['street'].setValue('');
        component.registrationForm.controls['city'].setValue('');
        component.registrationForm.controls['country'].setValue('');
        component.registrationForm.controls['phone'].setValue('');
        component.registrationForm.controls['password'].setValue('');
        component.registrationForm.controls['confirmedPassword'].setValue('');
        expect(component.registrationForm.valid).toBeFalsy();

        spyOn(component, 'register');
        element = fixture.debugElement.query(By.css('button')).nativeElement;
        element.click();
        expect(component.register).toHaveBeenCalledTimes(0);

        const req = httpClient.expectNone({
            method: 'POST',
            url: `http://localhost:8080/api/v1/users/register`
        });
    });

    it('should not register account due to invalid fields', () => {
        component.registrationForm.controls['email'].setValue('asd');
        component.registrationForm.controls['name'].setValue('123');
        component.registrationForm.controls['surname'].setValue('123');
        component.registrationForm.controls['street'].setValue('--');
        component.registrationForm.controls['city'].setValue('123');
        component.registrationForm.controls['country'].setValue('123');
        component.registrationForm.controls['phone'].setValue('asd');
        component.registrationForm.controls['password'].setValue('12');
        component.registrationForm.controls['confirmedPassword'].setValue('34');
        expect(component.registrationForm.valid).toBeFalsy();

        spyOn(component, 'register');
        element = fixture.debugElement.query(By.css('button')).nativeElement;
        element.click();
        expect(component.register).toHaveBeenCalledTimes(0);

        const req = httpClient.expectNone({
            method: 'POST',
            url: `http://localhost:8080/api/v1/users/register`
        });
    });


    it('should not register account due to passwords not matching', () => {
        component.registrationForm.controls['email'].setValue('asd@gmail.com');
        component.registrationForm.controls['name'].setValue('Nikola');
        component.registrationForm.controls['surname'].setValue('Nikolic');
        component.registrationForm.controls['street'].setValue('Ulica 15');
        component.registrationForm.controls['city'].setValue('Grad');
        component.registrationForm.controls['country'].setValue('Srbija');
        component.registrationForm.controls['phone'].setValue('12345678');
        component.registrationForm.controls['password'].setValue('sifra');
        component.registrationForm.controls['confirmedPassword'].setValue('sifra123');
        expect(component.registrationForm.valid).toBeTruthy();

        spyOn(component, 'register');
        element = fixture.debugElement.query(By.css('button')).nativeElement;
        element.click();
        expect(component.register).toHaveBeenCalledTimes(0);

        const req = httpClient.expectNone({
            method: 'POST',
            url: `http://localhost:8080/api/v1/users/register`
        });

    });

    it('should register account ', () => {
        component.registrationForm.controls['email'].setValue('asd@gmail.com');
        component.registrationForm.controls['name'].setValue('Nikola');
        component.registrationForm.controls['surname'].setValue('Nikolic');
        component.registrationForm.controls['street'].setValue('Ulica 15');
        component.registrationForm.controls['city'].setValue('Grad');
        component.registrationForm.controls['country'].setValue('Srbija');
        component.registrationForm.controls['phone'].setValue('12345678');
        component.registrationForm.controls['password'].setValue('sifra123');
        component.registrationForm.controls['confirmedPassword'].setValue('sifra123');
        expect(component.registrationForm.valid).toBeTruthy();

        component.register().subscribe({
            next: () => console.log("Registered"),
            error: (err) => console.log("Didn't register")
        });

        const req = httpClient.expectOne({
            method: 'POST',
            url: `http://localhost:8080/api/v1/users/register`
        });
        req.flush({ status: 201, statusText: 'CREATED' });

        httpClient.verify();


    });

    it('should not register account because user with provided email already exists ', () => {
        component.registrationForm.controls['email'].setValue('petar@gmail.com');
        component.registrationForm.controls['name'].setValue('Nikola');
        component.registrationForm.controls['surname'].setValue('Nikolic');
        component.registrationForm.controls['street'].setValue('Ulica 15');
        component.registrationForm.controls['city'].setValue('Grad');
        component.registrationForm.controls['country'].setValue('Srbija');
        component.registrationForm.controls['phone'].setValue('12345678');
        component.registrationForm.controls['password'].setValue('sifra123');
        component.registrationForm.controls['confirmedPassword'].setValue('sifra123');
        expect(component.registrationForm.valid).toBeTruthy();

        component.register().subscribe({
            next: () => console.log("Registered"),
            error: (err) => console.log("Didn't register")
        });

        const req = httpClient.expectOne({
            method: 'POST',
            url: `http://localhost:8080/api/v1/users/register`
        });
        req.flush({ status: 400, statusText: 'BAD_REQUEST' });

        httpClient.verify();

    });


});
