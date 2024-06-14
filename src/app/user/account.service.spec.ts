import { TestBed } from '@angular/core/testing';
import { AccountService } from './account.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { user1, user2, user3 } from './mocks/user.mocks';
import { environment } from '../../env/env';
import { PasswordUpdate } from './model/password-update.model';

describe('AccountService', () => {
    let service: AccountService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(AccountService);
        httpController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call findById and return user1 from user.mocks.ts', () => {
        const id = 1;
        service.findById(id).subscribe((res) => {
            expect(res).toEqual(user1);
        });
        const req = httpController.expectOne({
            method: 'GET',
            url: `${environment.apiHost}users/${id}`
        });
        req.flush(user1);
    });

    it('should call update and return updated user (user2 from user.mocks.ts)', () => {
        service.update(user2).subscribe((res) => {
            expect(res).toEqual(user2);
        });
        const req = httpController.expectOne({
            method: 'PUT',
            url: `${environment.apiHost}users`,
        });
        req.flush(user2);
    });

    it('should call updatePassword and return updated password', () => {
        const passwordUpdate = { oldPassword: 'old', newPassword: 'new' };
        service.updatePassword(passwordUpdate).subscribe((res) => {
            expect(res).toEqual(passwordUpdate);
        });
        const req = httpController.expectOne({
            method: 'PUT',
            url: `${environment.apiHost}users/password`
        });
        req.flush(passwordUpdate);
    });

    it('should call deactivate and return success', () => {
        const userId = 1;
        service.deactivate(userId).subscribe((res) => {
            expect(res).toBeTruthy();
        });
        const req = httpController.expectOne({
            method: 'DELETE',
            url: `${environment.apiHost}users/deactivate/${userId}`
        });
        req.flush({});
    });
});
