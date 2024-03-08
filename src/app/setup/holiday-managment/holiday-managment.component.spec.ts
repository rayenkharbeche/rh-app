import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayManagmentComponent } from './holiday-managment.component';

describe('HolidayManagmentComponent', () => {
  let component: HolidayManagmentComponent;
  let fixture: ComponentFixture<HolidayManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayManagmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HolidayManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
