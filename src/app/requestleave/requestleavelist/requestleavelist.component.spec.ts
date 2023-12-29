import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestleavelistComponent } from './requestleavelist.component';

describe('RequestleavelistComponent', () => {
  let component: RequestleavelistComponent;
  let fixture: ComponentFixture<RequestleavelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestleavelistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestleavelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
