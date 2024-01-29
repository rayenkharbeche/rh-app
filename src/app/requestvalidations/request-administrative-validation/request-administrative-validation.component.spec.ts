import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAdministrativeValidationComponent } from './request-administrative-validation.component';

describe('RequestAdministrativeValidationComponent', () => {
  let component: RequestAdministrativeValidationComponent;
  let fixture: ComponentFixture<RequestAdministrativeValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestAdministrativeValidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestAdministrativeValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
