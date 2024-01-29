import { Component } from '@angular/core';
import { Requestleave } from '../../requestleave/model/requestleave';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestleaveService } from '../../requestleave/service/requestleave.service';
import { RequestleaveInterneStatus } from '../../requestleave/model/requestleaveInterneStatus';
import { RequestleaveStatus } from '../../requestleave/model/requestleaveStatus';

@Component({
  selector: 'app-request-leavevalidations',
  templateUrl: './request-leavevalidations.component.html',
  styleUrl: './request-leavevalidations.component.css'
})
export class RequestLeavevalidationsComponent {
  status!: string;
  requests!: Requestleave[];
  request!: Requestleave;
  currentUser:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestleaveservice: RequestleaveService,


  ) { }
  

  selectedId: any ;

  
    

  
    ngOnInit(): void {
      this.currentUser  = JSON.parse(localStorage.getItem('user')!);

      this.retrievRequest();

    }
  requestUpdateStatus(requestId:any,status:any) {
    this.requestleaveservice.updateStatus(requestId,status)
    .subscribe({
      next: (data) => {
        if (data.status == RequestleaveStatus.Validated){
          this.requestleaveservice.updateCredit(data)
          .subscribe({
            next: (data) => {
            }})
        }
      },
      error: (e) => console.error(e)
    });
  }
    retrievRequest(){

if (this.currentUser.role == "Rh"){
  this.requestleaveservice.getAllvalidated()
  .subscribe({
    next: (data) => {
      this.requests = data;
      console.log(this.requests);
    }})
}else {
      this.requestleaveservice.getAllbyTeam(this.currentUser.id)
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
  }


validateRequest( rqleave: Requestleave){
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
  
    rejectRequest(rqleave: Requestleave){

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
  