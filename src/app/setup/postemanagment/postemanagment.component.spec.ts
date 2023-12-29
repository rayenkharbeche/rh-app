import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostemanagmentComponent } from './postemanagment.component';

describe('PostemanagmentComponent', () => {
  let component: PostemanagmentComponent;
  let fixture: ComponentFixture<PostemanagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostemanagmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostemanagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
