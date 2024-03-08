import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestleaveService } from '../service/requestleave.service';
import { Requestleave } from '../model/requestleave';
import { RequestleaveStatus } from '../model/requestleaveStatus';
import { RequestleaveInterneStatus } from '../model/requestleaveInterneStatus';
import { RequestEquipmentType } from '../../requestequipment/model/requestequipmenttype';
import { RequestleaveType } from '../model/requestleavetype';

@Component({
  selector: 'app-requestleavelist',
  templateUrl: './requestleavelist.component.html',
  styleUrl: './requestleavelist.component.css'
})
export class RequestleavelistComponent {
  status!: string;
  requests!: Requestleave[];
  public LeaveEnum = RequestleaveType;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestleaveservice: RequestleaveService,


  ) { }
  item: {
    
    id: string;
    name: string;
    state: string;
    registered: string;
    country: string;
    usage: number;
    period: string;
    payment: string;
    activity: string;
    avatar: string;
    status: string;
    color: string;
  } | undefined;
  

  selectedId: any ;

  


  
    ngOnInit(): void {
   
      this.retrievRequest();

    }
    retrievRequest(){

      var currentUser  = JSON.parse(localStorage.getItem('user')!);

      this.requestleaveservice.getAllbyUser(currentUser.id)
      .subscribe({
        next: (data) => {
          this.requests = data;
          console.log(data);
          this.requests.map(x=> {
            x.leaveType = this.showEnumName(x.leaveType)!
          });

        },
        error: (e) => console.error(e)
      });
    }

  
     showEnumName(obj: string ) {
     switch (obj){
      case 'sickLeave':
        obj = 'Congé maladie'
      break;
      case 'annualLeave':
        obj = 'Congé annuel'
      break;
      case 'unpaidLeave':
        obj = 'Congé non payé'
      break;
      case 'rttLeave':
        obj = 'Congé RTT'
      break;
      case 'specialLeave':
        obj = 'Congé spéciale'
        break;
    }
    return obj

  }

    updateRequest( rqleave: Requestleave){
      console.log(rqleave);
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'requestleave/detail/'+ rqleave.id ;
      this.router.navigateByUrl(returnUrl);   
     }
  
    CancelRequest(rqleave: Requestleave){

      console.log("test");
    
      if (rqleave.interneStatus == "open"){
      rqleave.status = RequestleaveStatus.Inactive;
      rqleave.interneStatus = RequestleaveInterneStatus.Inactive;
      } else if (rqleave.interneStatus == "ongoing"){
        rqleave.status = RequestleaveStatus.ongoing;
      rqleave.interneStatus = RequestleaveInterneStatus.Inactive;
      }
      else if (rqleave.interneStatus == "tl_validated"){
        rqleave.status = RequestleaveStatus.ongoing;
      rqleave.interneStatus = RequestleaveInterneStatus.tl_validated_inactive;
      }else if (rqleave.interneStatus == "validated"){
        rqleave.status = RequestleaveStatus.ongoing;
      rqleave.interneStatus = RequestleaveInterneStatus.validated_inactive;
      }

      this.requestleaveservice.update(rqleave.id!, rqleave)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.retrievRequest();

                  },
        error: (e) => console.error(e)
      });

    }
    
  
  
  
    
  }
  