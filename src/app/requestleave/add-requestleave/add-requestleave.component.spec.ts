import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequestleaveComponent } from './add-requestleave.component';

describe('AddRequestleaveComponent', () => {
  let component: AddRequestleaveComponent;
  let fixture: ComponentFixture<AddRequestleaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRequestleaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRequestleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
