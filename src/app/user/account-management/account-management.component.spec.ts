import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountManagementComponent } from './account-management.component';
import { AccountService } from '../account.service';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { user1, user3 } from '../mocks/user.mocks';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input } from '@angular/core';

describe('AccountManagementComponent', () => {
    let component: AccountManagementComponent;
    let fixture: ComponentFixture<AccountManagementComponent>;
    let accountServiceSpy: jasmine.SpyObj<AccountService>
    let authServiceSpy: jasmine.SpyObj<AuthService>

    beforeEach(async () => {
        accountServiceSpy = jasmine.createSpyObj<AccountService>(AccountService.name, {
            'findById': of(user1),
            'update': of(user3)
        });
        authServiceSpy = jasmine.createSpyObj<AuthService>(AuthService.name, {
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
                FormStub
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AccountManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});


@Component({ selector: 'app-file-uploader', template: '' })
class AppFileUploader {
    @Input('endpoint')
    public endpoint = '';
    @Input('paramName')
    public paramName = '';
    @Input('text')
    public text = '';
}

@Component({ selector: 'mat-form-field', template: '' })
class MatFormFieldStub { }

@Component({ selector: 'mat-label', template: '' })
class MatLabelStub { }

@Component({ selector: 'form', template: '' })
class FormStub {
    @Input('formGroup')
    public formGroup = '';
}