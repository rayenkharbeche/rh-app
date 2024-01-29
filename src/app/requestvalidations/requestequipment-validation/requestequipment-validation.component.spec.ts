import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestequipmentValidationComponent } from './requestequipment-validation.component';

describe('RequestequipmentValidationComponent', () => {
  let component: RequestequipmentValidationComponent;
  let fixture: ComponentFixture<RequestequipmentValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestequipmentValidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestequipmentValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
