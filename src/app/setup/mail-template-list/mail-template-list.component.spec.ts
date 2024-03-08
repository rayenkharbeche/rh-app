import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailTemplateListComponent } from './mail-template-list.component';

describe('MailTemplateListComponent', () => {
  let component: MailTemplateListComponent;
  let fixture: ComponentFixture<MailTemplateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailTemplateListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MailTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
