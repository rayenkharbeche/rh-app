import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolemanagmentComponent } from './rolemanagment.component';

describe('RolemanagmentComponent', () => {
  let component: RolemanagmentComponent;
  let fixture: ComponentFixture<RolemanagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolemanagmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RolemanagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
