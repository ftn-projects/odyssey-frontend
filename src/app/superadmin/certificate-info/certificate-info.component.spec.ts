import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateInfoComponent } from './certificate-info.component';

describe('CertificateInfoComponent', () => {
  let component: CertificateInfoComponent;
  let fixture: ComponentFixture<CertificateInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CertificateInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CertificateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
