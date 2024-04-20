import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateCreationComponent } from './certificate-creation.component';

describe('CertificateCreationComponent', () => {
  let component: CertificateCreationComponent;
  let fixture: ComponentFixture<CertificateCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CertificateCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CertificateCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
