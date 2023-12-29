import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestleaveupdateComponent } from './requestleaveupdate.component';

describe('RequestleaveupdateComponent', () => {
  let component: RequestleaveupdateComponent;
  let fixture: ComponentFixture<RequestleaveupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestleaveupdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestleaveupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
