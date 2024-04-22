import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertDatePickerComponent } from './cert-date-picker.component';

describe('CertDatePickerComponent', () => {
  let component: CertDatePickerComponent;
  let fixture: ComponentFixture<CertDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CertDatePickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CertDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
