import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostAccommodationsViewComponent } from './host-accommodations-view.component';

describe('HostAccommodationsViewComponent', () => {
  let component: HostAccommodationsViewComponent;
  let fixture: ComponentFixture<HostAccommodationsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostAccommodationsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HostAccommodationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
