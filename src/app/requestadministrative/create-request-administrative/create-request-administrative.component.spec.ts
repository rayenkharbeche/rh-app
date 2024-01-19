import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequestAdministrativeComponent } from './create-request-administrative.component';

describe('CreateRequestAdministrativeComponent', () => {
  let component: CreateRequestAdministrativeComponent;
  let fixture: ComponentFixture<CreateRequestAdministrativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRequestAdministrativeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRequestAdministrativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
