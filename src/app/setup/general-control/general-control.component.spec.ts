import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralControlComponent } from './general-control.component';

describe('GeneralControlComponent', () => {
  let component: GeneralControlComponent;
  let fixture: ComponentFixture<GeneralControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
