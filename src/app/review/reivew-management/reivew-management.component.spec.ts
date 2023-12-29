import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReivewManagementComponent } from './reivew-management.component';

describe('ReivewManagementComponent', () => {
  let component: ReivewManagementComponent;
  let fixture: ComponentFixture<ReivewManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReivewManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReivewManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
