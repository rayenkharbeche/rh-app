import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatedSickLeaveComponent } from './validated-sick-leave.component';

describe('ValidatedSickLeaveComponent', () => {
  let component: ValidatedSickLeaveComponent;
  let fixture: ComponentFixture<ValidatedSickLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidatedSickLeaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidatedSickLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
