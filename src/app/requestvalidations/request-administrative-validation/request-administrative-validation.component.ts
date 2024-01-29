import { Component } from '@angular/core';
import { Requestleave } from '../../requestleave/model/requestleave';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestleaveService } from '../../requestleave/service/requestleave.service';
import { RequestleaveInterneStatus } from '../../requestleave/model/requestleaveInterneStatus';
import { RequestleaveStatus } from '../../requestleave/model/requestleaveStatus';
import { RequestadministrativeService } from '../../requestadministrative/service/requestadministrative.service';
import { Requestadministrative } from '../../requestadministrative/model/requestadministrative';
@Component({
  selector: 'app-request-administrative-validation',
  templateUrl: './request-administrative-validation.component.html',
  styleUrl: './request-administrative-validation.component.css'
})
export class RequestAdministrativeValidationComponent {

  status!: string;
  requests!: Requestadministrative[];
  request!: Requestadministrative;
  currentUser:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestadministrativeService: RequestadministrativeService,


  ) { }
  

  selectedId: any ;

  
    ngOnInit(): void {
      this.currentUser  = JSON.parse(localStorage.getItem('user')!);

      this.retrievRequest(this.currentUser.id);

    }
  requestUpdateStatus(requestId:any,status:any) {
    this.requestadministrativeService.update(requestId,status)
    .subscribe({
      next: (data) => {
        
      },
      error: (e) => console.error(e)
    });
  }
    retrievRequest(id:any){

      this.requestadministrativeService.getAllbyUserValidation(id)
      .subscribe({
        next: (data) => {
          this.requests = data;
          console.log(this.requests);
          for (let request of this.requests) {  
            console.log(request.id);
            if (request.status == RequestleaveStatus.OPEN){
            request.status = RequestleaveStatus.ongoing;
            request.interneStatus = RequestleaveInterneStatus.ongoing;


            this.requestUpdateStatus(request.id!,request );    
            }      
            }
          
        },
        error: (e) => console.error(e)
      });
    }


validateRequest( rqleave: Requestadministrative){
  console.log(this.currentUser.role)
  
    rqleave.interneStatus = RequestleaveInterneStatus.Validated;
    rqleave.status = RequestleaveStatus.Validated;
  
      
     this.requestUpdateStatus(rqleave.id!,rqleave );      

      this.retrievRequest(this.currentUser.id);

     }
  
    rejectRequest(rqleave: Requestadministrative){

           rqleave.status = RequestleaveStatus.Rejected;
    
          
      this.requestUpdateStatus(rqleave.id!, rqleave);          
      this.retrievRequest(this.currentUser.id);

      

    }
    
  
  
  
    
  }
  
