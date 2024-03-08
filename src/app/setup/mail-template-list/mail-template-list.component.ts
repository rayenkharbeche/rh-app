import { Component } from '@angular/core';
import { MailTemplateService } from '../service/mailTemplate.service';
import { MailTemplate } from '../model/MailTemplate';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mail-template-list',
 
  templateUrl: './mail-template-list.component.html',
  styleUrl: './mail-template-list.component.css'
})
export class MailTemplateListComponent {
  mailTemplates:MailTemplate[] = [];
  constructor(private mailTemplateService: MailTemplateService,
    private route: ActivatedRoute,
    private router: Router,
    ) { 

    }


  ngOnInit(): void {

    this.retrievemailTemplates(); 
  }
  retrievemailTemplates(){
    this.mailTemplateService.getAll()
    .subscribe({
      next: (data) => {
        this.mailTemplates = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
  removeTemplate(id :any ){
    this.mailTemplateService.delete(id)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.retrievemailTemplates();
      },
      error: (e) => console.error(e)
    });

  }
  removeAllTemplates(){
    this.mailTemplateService.deleteAll()
    .subscribe({
      next: (res) => {
        console.log(res);
        this.retrievemailTemplates();
      },
      error: (e) => console.error(e)
    });

  }
  updateTemplate(mail :any ){
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'setup/mailTemplate/'+ mail.id ;
    this.router.navigateByUrl(returnUrl);   
   }

  }

