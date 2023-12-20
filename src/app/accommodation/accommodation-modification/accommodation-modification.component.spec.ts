import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccommodationModificationComponent } from './accommodation-modification.component';

describe('AccommodationModificationComponent', () => {
    let component: AccommodationModificationComponent;
    let fixture: ComponentFixture<AccommodationModificationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AccommodationModificationComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AccommodationModificationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
