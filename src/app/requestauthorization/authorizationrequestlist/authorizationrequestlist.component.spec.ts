import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationleavelistComponent } from './authorizationrequestlist.component';

describe('AuthorizationleavelistComponent', () => {
  let component: AuthorizationleavelistComponent;
  let fixture: ComponentFixture<AuthorizationleavelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorizationleavelistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthorizationleavelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
