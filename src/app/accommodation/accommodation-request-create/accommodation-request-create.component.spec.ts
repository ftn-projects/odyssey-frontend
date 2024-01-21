import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccommodationRequestCreateComponent } from './accommodation-request-create.component';

describe('AccommodationRequestCreateComponent', () => {
    let component: AccommodationRequestCreateComponent;
    let fixture: ComponentFixture<AccommodationRequestCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AccommodationRequestCreateComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AccommodationRequestCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
