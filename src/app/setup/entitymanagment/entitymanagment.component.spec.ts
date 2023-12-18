import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitymanagmentComponent } from './entitymanagment.component';

describe('EntitymanagmentComponent', () => {
  let component: EntitymanagmentComponent;
  let fixture: ComponentFixture<EntitymanagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntitymanagmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntitymanagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
