import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReportsDialogComponent } from './user-reports-dialog.component';

describe('UserReportsDialogComponent', () => {
  let component: UserReportsDialogComponent;
  let fixture: ComponentFixture<UserReportsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserReportsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserReportsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
