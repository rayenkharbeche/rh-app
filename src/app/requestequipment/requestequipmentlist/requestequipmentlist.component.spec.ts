import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestequipmentlistComponent } from './requestequipmentlist.component';

describe('RequestequipmentlistComponent', () => {
  let component: RequestequipmentlistComponent;
  let fixture: ComponentFixture<RequestequipmentlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestequipmentlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestequipmentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
