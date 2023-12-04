import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationFilterComponent } from './accommodation-filter.component';

describe('AccommodationFilterComponent', () => {
    let component: AccommodationFilterComponent;
    let fixture: ComponentFixture<AccommodationFilterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AccommodationFilterComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AccommodationFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
