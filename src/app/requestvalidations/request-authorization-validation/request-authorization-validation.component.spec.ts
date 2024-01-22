import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAuthorizationValidationComponent } from './request-authorization-validation.component';

describe('RequestAuthorizationValidationComponent', () => {
  let component: RequestAuthorizationValidationComponent;
  let fixture: ComponentFixture<RequestAuthorizationValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestAuthorizationValidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestAuthorizationValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
