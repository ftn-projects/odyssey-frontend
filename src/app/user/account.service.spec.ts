import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { user1, user2, user3 } from './mocks/user.mocks';
import { environment } from '../../env/env';

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

    it('Should be created', () => {
        expect(service).toBeTruthy();
    });

    it('Should call findById and return user1 from user.mocks.ts', () => {
        const userId = 1;
        service.findById(userId).subscribe((res) => {
            expect(res).toEqual(user1);
        });
        const req = httpController.expectOne({
            method: 'GET',
            url: environment.apiHost + 'users/' + userId
        });
        req.flush(user1);
    });

    it('Should call update with user2 and return updated user (user3 from user.mocks.ts)', () => {
        service.update(user2).subscribe((res) => {
            expect(res).toEqual(user3);
        });
        const req = httpController.expectOne({
            method: 'PUT',
            url: environment.apiHost + 'users',
        });
        req.flush(user3);
    });
});
