import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationImagesDialogComponent } from './accommodation-images-dialog.component';

describe('AccommodationImagesDialogComponent', () => {
  let component: AccommodationImagesDialogComponent;
  let fixture: ComponentFixture<AccommodationImagesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccommodationImagesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationImagesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
