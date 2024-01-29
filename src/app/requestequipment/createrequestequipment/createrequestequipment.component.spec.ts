import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaterequestequipmentComponent } from './createrequestequipment.component';

describe('CreaterequestequipmentComponent', () => {
  let component: CreaterequestequipmentComponent;
  let fixture: ComponentFixture<CreaterequestequipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreaterequestequipmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreaterequestequipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
