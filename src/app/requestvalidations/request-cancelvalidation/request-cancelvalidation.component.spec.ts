import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCancelvalidationComponent } from './request-cancelvalidation.component';

describe('RequestCancelvalidationComponent', () => {
  let component: RequestCancelvalidationComponent;
  let fixture: ComponentFixture<RequestCancelvalidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestCancelvalidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestCancelvalidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
