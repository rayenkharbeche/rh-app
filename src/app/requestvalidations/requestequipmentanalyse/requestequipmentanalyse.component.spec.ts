import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestequipmentanalyseComponent } from './requestequipmentanalyse.component';

describe('RequestequipmentanalyseComponent', () => {
  let component: RequestequipmentanalyseComponent;
  let fixture: ComponentFixture<RequestequipmentanalyseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestequipmentanalyseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestequipmentanalyseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
