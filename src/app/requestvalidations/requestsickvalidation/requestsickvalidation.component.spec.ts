import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsickvalidationComponent } from './requestsickvalidation.component';

describe('RequestsickvalidationComponent', () => {
  let component: RequestsickvalidationComponent;
  let fixture: ComponentFixture<RequestsickvalidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestsickvalidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestsickvalidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
