import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersImportComponent } from './users-import.component';

describe('UsersImportComponent', () => {
  let component: UsersImportComponent;
  let fixture: ComponentFixture<UsersImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersImportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
