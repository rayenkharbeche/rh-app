import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateentityComponent } from './createentity.component';

describe('CreateentityComponent', () => {
  let component: CreateentityComponent;
  let fixture: ComponentFixture<CreateentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateentityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
