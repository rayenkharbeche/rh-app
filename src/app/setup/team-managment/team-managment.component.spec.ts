import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamManagmentComponent } from './team-managment.component';

describe('TeamManagmentComponent', () => {
  let component: TeamManagmentComponent;
  let fixture: ComponentFixture<TeamManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamManagmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
