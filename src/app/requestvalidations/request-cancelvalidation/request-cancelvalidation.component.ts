import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Requestleave } from '../../requestleave/model/requestleave';
import { RequestleaveService } from '../../requestleave/service/requestleave.service';
import { RequestleaveInterneStatus } from '../../requestleave/model/requestleaveInterneStatus';
import { RequestleaveStatus } from '../../requestleave/model/requestleaveStatus';




@Component({
  selector: 'app-request-cancelvalidation',
  templateUrl: './request-cancelvalidation.component.html',
  styleUrl: './request-cancelvalidation.component.css'
})
export class RequestCancelvalidationComponent {

  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  status!: string;
  requests!: Requestleave[];
  request!: Requestleave;
  requestSelected!: Requestleave;
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestleaveservice: RequestleaveService,
    private http: HttpClient

  ) { }
  

  selectedId: any ;

  
    
  get f(){
    return this.myForm.controls;
  }
  
    ngOnInit(): void {
      this.retrievRequest();

    }
  requestUpdateStatus(requestId:any,status:any) {
    this.requestleaveservice.updateStatus(requestId,status)
    .subscribe({
      next: (data) => {
        if (data.status == "Validated"){
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

       this.currentUser  = JSON.parse(localStorage.getItem('user')!);

      this.requestleaveservice.getAllCanceledbyTeam(this.currentUser.id)
      .subscribe({
        next: (data) => {
          this.requests = data;
          console.log(this.requests);
          
        },
        error: (e) => console.error(e)
      });
    }
    
      


   

   
    
  
    validateCancelRequest(rqleave: any) {

      if (this.currentUser.role == "teamLead"){
        rqleave.interneStatus = RequestleaveInterneStatus.tl_validated_inactive;
        rqleave.status = RequestleaveStatus.ongoing;
      }else {
        rqleave.interneStatus = RequestleaveInterneStatus.Inactive;
        rqleave.status = RequestleaveStatus.Inactive;
      }

      
      this.requestUpdateStatus(rqleave.id!, rqleave);          
      this.retrievRequest();
    }
    rejectCancelRequest(rqleave: any) {
      rqleave.interneStatus = RequestleaveInterneStatus.Validated;
          rqleave.status = RequestleaveStatus.Validated;
          
          this.requestUpdateStatus(rqleave.id!, rqleave);          
          this.retrievRequest();
    }
      

      
  }


    
  
  

