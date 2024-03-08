import { Component } from '@angular/core';
import { Requestleave } from '../../requestleave/model/requestleave';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestleaveInterneStatus } from '../../requestleave/model/requestleaveInterneStatus';
import { RequestleaveStatus } from '../../requestleave/model/requestleaveStatus';
import { AuthorizationService } from '../../requestauthorization/service/authorization.service';
import { RequestAuthorization } from '../../requestauthorization/model/requestauthorization';
@Component({
  selector: 'app-request-authorization-validation',
  templateUrl: './request-authorization-validation.component.html',
  styleUrl: './request-authorization-validation.component.css'
})
export class RequestAuthorizationValidationComponent {


  status!: string;
  requests!: RequestAuthorization[];
  request!: RequestAuthorization;
  currentUser:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authorizationService: AuthorizationService,


  ) { }
  

  selectedId: any ;

  
    

  
    ngOnInit(): void {
      this.currentUser  = JSON.parse(localStorage.getItem('user')!);

      this.retrievRequest();

    }
  requestUpdateStatus(requestId:any,status:any) {
    this.authorizationService.updateStatus(requestId,status)
    .subscribe({
      next: (data) => {
     
      },
      error: (e) => console.error(e)
    });
  }
    retrievRequest(){


      this.authorizationService.getAllbyTeam(this.currentUser.id)
      .subscribe({
        next: (data) => {
          this.requests = data;
          console.log(this.requests);
          if (this.requests != null) {

          for (let request of this.requests) {  
            console.log(request.id);
            if (request.status == RequestleaveStatus.OPEN && request.interneStatus == RequestleaveStatus.OPEN){
            request.status = RequestleaveStatus.ongoing;
            request.interneStatus = RequestleaveInterneStatus.ongoing;


            this.requestUpdateStatus(request.id!,request );    
            }      
            }
          }
          
        },
        error: (e) => console.error(e)
      });
    }


validateRequest( rqleave: RequestAuthorization){
  console.log(this.currentUser.role)
  if (this.currentUser.role == "teamLead"){
    rqleave.interneStatus = RequestleaveInterneStatus.TLvalidated;
    rqleave.status = RequestleaveStatus.ongoing;
  }else {
    rqleave.interneStatus = RequestleaveInterneStatus.Validated;
    rqleave.status = RequestleaveStatus.Validated;
  }
      
      this.requestUpdateStatus(rqleave.id!,rqleave );      

      this.retrievRequest();

     }
  
    rejectRequest(rqleave: RequestAuthorization){

      if (this.currentUser.role == "teamLead"){
        rqleave.interneStatus = RequestleaveInterneStatus.TLRejected;
        rqleave.status = RequestleaveStatus.Rejected;
      }else {
        rqleave.interneStatus = RequestleaveInterneStatus.Rejected;
        rqleave.status = RequestleaveStatus.Rejected;
      }
          
      this.requestUpdateStatus(rqleave.id!, rqleave);          
      this.retrievRequest();

      

    }
    
  
  
  
    
  }
  