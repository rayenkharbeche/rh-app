import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAuthorizationComponent } from './create-authorization.component';

describe('CreateAuthorizationComponent', () => {
  let component: CreateAuthorizationComponent;
  let fixture: ComponentFixture<CreateAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAuthorizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
