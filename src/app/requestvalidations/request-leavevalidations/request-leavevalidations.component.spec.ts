import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestLeavevalidationsComponent } from './request-leavevalidations.component';

describe('RequestLeavevalidationsComponent', () => {
  let component: RequestLeavevalidationsComponent;
  let fixture: ComponentFixture<RequestLeavevalidationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestLeavevalidationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestLeavevalidationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
