import { Component } from '@angular/core';
import { MailTemplateType } from '../model/mailTemplatetype';
import { MailTemplateService } from '../service/mailTemplate.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mail-template',
  templateUrl: './mail-template.component.html',
  styleUrl: './mail-template.component.css'
})
export class MailTemplateComponent {
  submitted!: boolean;
  message!: any;
  MailTemplateType: any;
  subject: any;
  templateMail: any;
  loading: any;
  reference: any;
  created: boolean = true;
  id!: string;
constructor(private mailTemplateService: MailTemplateService,
            private router: Router,
            private _activatedroute:ActivatedRoute,
    ) { }






  ngOnInit() {
     this.id = this._activatedroute.snapshot.paramMap.get("id")!;
    if (this.id != null){
     this.message = "Update Mail Template" 
     this.created = false

    this.mailTemplateService.get(this.id!)
    .subscribe({
      next: (data) => {
        this.reference    = data.reference;
        this.subject      = data.subject;
        this.templateMail = data.template;
      }
    })
  }else {
    this.message = "Create Mail Template" 
    this.created = true

  }
    this.MailTemplateType = MailTemplateType;
  

  }

    getKeys(obj: any) { return Object.keys(obj); }
  
    CreateTemplate() {
      console.log(this.templateMail)
      const data = {
        reference:this.reference,
        subject: this.subject,
        template: this.templateMail,
        status: 'active'
      };
  
      this.mailTemplateService.create(data)
        .subscribe({
          next: (res) => {
            console.log(res); 
            this.submitted = true;
            const returnUrl = this._activatedroute.snapshot.queryParams['returnUrl'] || '/setup/mailTemplateList' ;
            this.router.navigateByUrl(returnUrl);  
          },
          error: (e) => console.error(e)
        });      }

        UpdateTemplate(){
          const data = {
            reference:this.reference,
            subject: this.subject,
            template: this.templateMail,
            status: 'active'
  
          };
            this.mailTemplateService.update(this.id!, data)
      .subscribe({
        next: (res) => {
            const returnUrl = this._activatedroute.snapshot.queryParams['returnUrl'] || '/setup/mailTemplateList' ;
            this.router.navigateByUrl(returnUrl);   
        
        }})
        }
      Draft() {
        const data = {
          reference:this.reference,
          subject: this.subject,
          template: this.templateMail,
          status: 'draft'

        };
    
        this.mailTemplateService.create(data)
          .subscribe({
            next: (res) => {
              console.log(res); 
              this.submitted = true;
              const returnUrl = this._activatedroute.snapshot.queryParams['returnUrl'] || '/setup/mailTemplateList' ;
              this.router.navigateByUrl(returnUrl);  
            },
            error: (e) => console.error(e)
          });      }
      Discard() {
      this.ngOnInit()
      const returnUrl = this._activatedroute.snapshot.queryParams['returnUrl'] || '/setup/mailTemplateList' ;
      this.router.navigateByUrl(returnUrl);  
      }
}

  
  
  
 
  
  