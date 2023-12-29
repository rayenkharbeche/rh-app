import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdaterequestleaveComponent } from './updaterequestleave.component';

describe('UpdaterequestleaveComponent', () => {
  let component: UpdaterequestleaveComponent;
  let fixture: ComponentFixture<UpdaterequestleaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdaterequestleaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdaterequestleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
