import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestleaveInterneStatus } from '../../requestleave/model/requestleaveInterneStatus';
import { RequestleaveStatus } from '../../requestleave/model/requestleaveStatus';
import { AuthorizationService } from '../../requestauthorization/service/authorization.service';
import { RequestAuthorization } from '../../requestauthorization/model/requestauthorization';
import { Requestequipment } from '../../requestequipment/model/requestequipment';
import { RequestequipmentService } from '../../requestequipment/service/requestequipment.service';
import { RequestEquipmentStatut } from '../../requestequipment/model/requestequipmentstatut';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { RequestequipmentanalyseComponent } from '../requestequipmentanalyse/requestequipmentanalyse.component';
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
  validatedstatus!: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestequipmentService: RequestequipmentService,

    public dialog: MatDialog

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
          if (this.requests != null){

            for (let request of this.requests) {  
              console.log(request.id);
              if (request.status == RequestEquipmentStatut.OPEN){
              request.status = RequestEquipmentStatut.ongoing;


              this.requestUpdateStatus(request.id!,request );    
              }      
            }
          }
        },
        error: (e) => console.error(e)
      });
    }


    openDialog(request:any,name:any): void {
   
      const data = {
        equipmentrequest:request,
        equipmentName:  name
      };
      let dialogRef = this.dialog.open(RequestequipmentanalyseComponent, {
        width: '600px',
        data: data ,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.retrievRequest();
  
  
      });
    }
  
    
    
  

  
    rejectRequest(rqleave: Requestequipment){

     
      rqleave.status = RequestEquipmentStatut.Rejected;

      this.requestUpdateStatus(rqleave.id!, rqleave);          
      this.retrievRequest();

      

    }
    
    editRequest(rqleave: Requestequipment){

      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'requestvalidations/detail/'+ rqleave.id ;
      this.router.navigateByUrl(returnUrl);    

    }
    
  
  
  
    
  }
  