import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountManagementComponent } from './account-management.component';
import { AccountService } from '../account.service';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { passwordUpdate, user1, user3 } from '../mocks/user.mocks';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input } from '@angular/core';

describe('AccountManagementComponent', () => {
    let component: AccountManagementComponent;
    let fixture: ComponentFixture<AccountManagementComponent>;
    let accountServiceSpy: jasmine.SpyObj<AccountService>;
    let authServiceSpy: jasmine.SpyObj<AuthService>;

    beforeEach(async () => {
        accountServiceSpy = jasmine.createSpyObj<AccountService>('AccountService', {
            'findById': of(user1),
            'update': of(user3),
            'updatePassword': of(passwordUpdate)
        });
        authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', {
            'getId': 1,
            'removeUser': undefined
        });

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [
                AccountManagementComponent,
                AppFileUploader,
                MatFormFieldStub,
                MatLabelStub,
                MatIconStub,
                FormStub
            ],
            providers: [
                { provide: AccountService, useValue: accountServiceSpy },
                { provide: AuthService, useValue: authServiceSpy }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        fixture.destroy();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fill data with user', () => {
        expect(accountServiceSpy.findById).toHaveBeenCalledTimes(1);
        expect(component.user).toEqual(user1);
        expect(component.userForm.controls['name'].value).toEqual('Marko');
        expect(component.userForm.controls['surname'].value).toEqual('Marković');
        expect(component.userForm.controls['email'].value).toEqual('admin@gmail.com');
        expect(component.userForm.controls['phone'].value).toEqual('(+381)69423143');
        expect(component.userForm.controls['bio'].value).toEqual('');
        expect(component.userForm.controls['street'].value).toEqual('Bulevar cara Dušana 34');
        expect(component.userForm.controls['city'].value).toEqual('Novi Sad');
        expect(component.userForm.controls['country'].value).toEqual('Serbia');
    });

    it('should have form fields disabled initially', () => {
        for (const control in component.userForm.controls)
            expect(component.userForm.controls[control].disabled).toBeTruthy();
    });

    it('should have only edit button visible initially', () => {
        expect(fixture.nativeElement.querySelector('#btn-edit-info').disabled).toBeFalsy();
        expect(fixture.nativeElement.querySelector('#btn-save-info')).toBeNull();
        expect(fixture.nativeElement.querySelector('#btn-cancel-info')).toBeNull();
    });

    it('should have form fields enabled on edit click', () => {
        fixture.nativeElement.querySelector('#btn-edit-info').click();
        fixture.detectChanges();

        for (const control in component.userForm.controls)
            expect(component.userForm.controls[control].disabled).toBeFalsy();
    });

    it('should have edit button hidden, save and cancel buttons shown on edit click', () => {
        fixture.nativeElement.querySelector('#btn-edit-info').click();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('#btn-edit-info')).toBeNull();
        expect(fixture.nativeElement.querySelector('#btn-save-info').disabled).toBeFalsy();
        expect(fixture.nativeElement.querySelector('#btn-cancel-info').disabled).toBeFalsy();
    });

    it('should not save data if form is invalid', () => {
        [
            'name',
            'surname',
            'email',
            'phone',
            'street',
            'city',
            'country'
        ].forEach((control: string) => {
            fixture = TestBed.createComponent(AccountManagementComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            fixture.nativeElement.querySelector('#btn-edit-info').click();
            fixture.detectChanges();

            component.userForm.controls[control].setValue('');
            fixture.detectChanges();

            fixture.nativeElement.querySelector('#btn-save-info').click();
            fixture.detectChanges();

            expect(accountServiceSpy.update).toHaveBeenCalledTimes(0);
        });
    });

    it('should revert form values to original on cancel click', () => {
        fixture.nativeElement.querySelector('#btn-edit-info').click();
        fixture.detectChanges();

        component.userForm.controls['name'].setValue('newName');
        component.userForm.controls['surname'].setValue('newSurname');
        component.userForm.controls['email'].setValue('newEmail');
        component.userForm.controls['phone'].setValue('(+381)47861837');
        component.userForm.controls['bio'].setValue('newBio');
        component.userForm.controls['street'].setValue('newStreet');
        component.userForm.controls['city'].setValue('newCity');
        component.userForm.controls['country'].setValue('newCountry');

        fixture.nativeElement.querySelector('#btn-cancel-info').click();
        fixture.detectChanges();

        expect(component.userForm.controls['name'].value).toEqual('Marko');
        expect(component.userForm.controls['surname'].value).toEqual('Marković');
        expect(component.userForm.controls['email'].value).toEqual('admin@gmail.com');
        expect(component.userForm.controls['phone'].value).toEqual('(+381)69423143');
        expect(component.userForm.controls['bio'].value).toEqual('');
        expect(component.userForm.controls['street'].value).toEqual('Bulevar cara Dušana 34');
        expect(component.userForm.controls['city'].value).toEqual('Novi Sad');
        expect(component.userForm.controls['country'].value).toEqual('Serbia');
    });

    it('if form is valid, should save data on save click', () => {
        fixture.nativeElement.querySelector('#btn-edit-info').click();
        fixture.detectChanges();

        component.userForm.controls['name'].setValue('newName');
        component.userForm.controls['surname'].setValue('newSurname');
        component.userForm.controls['email'].setValue('newEmail');
        component.userForm.controls['phone'].setValue('(+381)47861837');
        component.userForm.controls['bio'].setValue('newBio');
        component.userForm.controls['street'].setValue('newStreet');
        component.userForm.controls['city'].setValue('newCity');
        component.userForm.controls['country'].setValue('newCountry');

        fixture.nativeElement.querySelector('#btn-save-info').click();
        fixture.detectChanges();

        expect(accountServiceSpy.update).toHaveBeenCalledTimes(1);
    });

    it('should not update password if passwords dont match', () => {
        component.passwordForm.controls['newPassword'].setValue('newPassword');
        component.passwordForm.controls['confirmPassword'].setValue('differentPassword');

        fixture.nativeElement.querySelector('#btn-save-password').click();
        fixture.detectChanges();

        expect(accountServiceSpy.updatePassword).toHaveBeenCalledTimes(0);
    });

    it('should update password if passwords match', () => {
        component.passwordForm.controls['oldPassword'].setValue('admin');
        component.passwordForm.controls['newPassword'].setValue('newPassword');
        component.passwordForm.controls['confirmPassword'].setValue('newPassword');

        fixture.nativeElement.querySelector('#btn-save-password').click();
        fixture.detectChanges();

        expect(accountServiceSpy.updatePassword).toHaveBeenCalledTimes(1);
    });
});

@Component({ selector: 'app-file-uploader', template: '' })
class AppFileUploader {
    @Input('endpoint') public endpoint = '';
    @Input('paramName') public paramName = '';
    @Input('text') public text = '';
}

@Component({ selector: 'mat-form-field', template: '' })
class MatFormFieldStub { }

@Component({ selector: 'mat-label', template: '' })
class MatLabelStub { }

@Component({ selector: 'mat-icon', template: '' })
class MatIconStub { }

@Component({ selector: 'form', template: '' })
class FormStub {
    @Input('formGroup') public formGroup = '';
}
