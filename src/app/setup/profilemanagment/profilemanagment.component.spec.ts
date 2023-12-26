import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilemanagmentComponent } from './profilemanagment.component';

describe('ProfilemanagmentComponent', () => {
  let component: ProfilemanagmentComponent;
  let fixture: ComponentFixture<ProfilemanagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilemanagmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilemanagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
