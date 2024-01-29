import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestleaveInterneStatus } from '../../requestleave/model/requestleaveInterneStatus';
import { RequestleaveStatus } from '../../requestleave/model/requestleaveStatus';
import { AuthorizationService } from '../../requestauthorization/service/authorization.service';
import { RequestAuthorization } from '../../requestauthorization/model/requestauthorization';
import { Requestequipment } from '../../requestequipment/model/requestequipment';
import { RequestequipmentService } from '../../requestequipment/service/requestequipment.service';
import { RequestEquipmentStatut } from '../../requestequipment/model/requestequipmentstatut';
@Component({
  selector: 'app-requestequipment-validation',
  templateUrl: './requestequipment-validation.component.html',
  styleUrl: './requestequipment-validation.component.css'
})
export class RequestequipmentValidationComponent {



  status!: string;
  requests!: Requestequipment[];
  request!: Requestequipment;
  currentUser:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestequipmentService: RequestequipmentService,


  ) { }
  

  selectedId: any ;

  
    

  
    ngOnInit(): void {
      this.currentUser  = JSON.parse(localStorage.getItem('user')!);

      this.retrievRequest();

    }
  requestUpdateStatus(requestId:any,status:any) {
    this.requestequipmentService.updateStatus(requestId,status)
    .subscribe({
      next: (data) => {
     
      },
      error: (e) => console.error(e)
    });
  }
    retrievRequest(){


      this.requestequipmentService.getAllbyUserValidation(this.currentUser.id)
      .subscribe({
        next: (data) => {
          this.requests = data;
          console.log(this.requests);
          for (let request of this.requests) {  
            console.log(request.id);
            if (request.status == RequestEquipmentStatut.OPEN){
            request.status = RequestEquipmentStatut.ongoing;


            this.requestUpdateStatus(request.id!,request );    
            }      
            }
          
          
        },
        error: (e) => console.error(e)
      });
    }


validateRequest( rqleave: Requestequipment){
  console.log(this.currentUser.role)
 
  rqleave.status = RequestEquipmentStatut.Validated;

      this.requestUpdateStatus(rqleave.id!,rqleave );      

      this.retrievRequest();

     }
  
    rejectRequest(rqleave: Requestequipment){

     
      rqleave.status = RequestEquipmentStatut.Rejected;

      this.requestUpdateStatus(rqleave.id!, rqleave);          
      this.retrievRequest();

      

    }
    
  
  
  
    
  }
  