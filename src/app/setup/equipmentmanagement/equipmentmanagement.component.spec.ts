import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentmanagementComponent } from './equipmentmanagement.component';

describe('EquipmentmanagementComponent', () => {
  let component: EquipmentmanagementComponent;
  let fixture: ComponentFixture<EquipmentmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentmanagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquipmentmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
