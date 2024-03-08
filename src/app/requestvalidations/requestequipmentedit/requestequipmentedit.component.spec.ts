import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestequipmenteditComponent } from './requestequipmentedit.component';

describe('RequestequipmenteditComponent', () => {
  let component: RequestequipmenteditComponent;
  let fixture: ComponentFixture<RequestequipmenteditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestequipmenteditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestequipmenteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
