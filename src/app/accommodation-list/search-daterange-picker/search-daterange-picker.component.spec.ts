import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDaterangePickerComponent } from './search-daterange-picker.component';

describe('SearchDaterangePickerComponent', () => {
  let component: SearchDaterangePickerComponent;
  let fixture: ComponentFixture<SearchDaterangePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchDaterangePickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchDaterangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
