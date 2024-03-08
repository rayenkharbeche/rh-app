import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
import { User } from '../../auth/model/user';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { image } from '../../auth/model/image';
import { Equipment } from '../../setup/model/equipment';
import { EquipmentService } from '../../setup/service/equipment.service';
import { RequestequipmentService } from '../../requestequipment/service/requestequipment.service';
import { Requestequipment } from '../../requestequipment/model/requestequipment';
import { RequestEquipmentStatut } from '../../requestequipment/model/requestequipmentstatut';
@Component({
  selector: 'app-requestequipmentedit',
  templateUrl: './requestequipmentedit.component.html',
  styleUrl: './requestequipmentedit.component.css'
})
export class RequestequipmenteditComponent {





  colors = [
    { color: 'primary', textColor: 'primary' },
    { color: 'secondary', textColor: 'secondary' },
    { color: 'success', textColor: 'success' },
    { color: 'danger', textColor: 'danger' },
    { color: 'warning', textColor: 'warning' },
    { color: 'info', textColor: 'info' },
    { color: 'light' },
    { color: 'dark' }
  ];

  form!: FormGroup;
  loading = false;
  submitted = false;
user!: User;

uploadedImage!: File;
dbImage: any;
postResponse: any;
successResponse!: string;
/*image: any;*/
i!: number;
users!: User[];
isUserConnected!: boolean;
imagepath!:any;
response: any;

  request: Requestequipment = new Requestequipment;

equipments?: Equipment[];

  imgContext = { $implicit: 'top', bottom: 'bottom' };
  equipmentsList!: string[];


    constructor(
        private formBuilder: FormBuilder,
        private httpClient: HttpClient,
        private router: Router,
        private _activatedroute:ActivatedRoute,
        private requestEquipment: RequestequipmentService,
        private equipmentService: EquipmentService
    ) { }
  
    ngOnInit() {
      const id = this._activatedroute.snapshot.paramMap.get("id");
      var currentUser  = JSON.parse(localStorage.getItem('user')!);

      
       

 
     
      this.requestEquipment.get(id!)
      .subscribe({
        next: (data) => {
          this.request = data;
        console.log(this.request)
        this.retrieveEquipments(this.request.userId.id);
      
    
       
        },
        error: (e) => console.error(e)

      });
      
     

    }
  


equipmentManagment(user:any) {
 
  const returnUrl = this._activatedroute.snapshot.queryParams['returnUrl'] || 'setup/equipmentmanagment/'+ user.id ;
  this.router.navigateByUrl(returnUrl);   

}
retrieveEquipments(id:any): void {
  this.equipmentService.getAllbyUserId(id)
    .subscribe({
      next: (data) => {
        this.equipments = data;
        this.equipmentsList = data.map(x=>x.name.toLowerCase())

        console.log(data);
      },
      error: (e) => console.error(e)
    });
}
validateRequest(request: Requestequipment) {
  const data = {
    name: request.equipmentName,
    reference:request.equipmentRef,
    user:   request.userId
  };
  if(this.equipmentsList.includes(request.equipmentName.toLowerCase())) {
    this.equipmentService.getbyUserIdbyName(request.userId.id,request.equipmentName)
    .subscribe({
      next: (res) => {
        console.log(res); 

  this.equipmentService.update(res.id, data)
    .subscribe({
      next: (res) => {
        console.log(res); 
        this.submitted = true;
        request.status = RequestEquipmentStatut.Validated;
        request.interneStatus = RequestEquipmentStatut.Validated;

        this.requestUpdateStatus(request.id!, request);      
      },
      error: (e) => console.error(e)
    });
  }})
  } else {
   
    this.equipmentService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res); 
          this.submitted = true;
          request.status = RequestEquipmentStatut.Validated;

          this.requestUpdateStatus(request.id!, request);          
        },
        error: (e) => console.error(e)
      });


  }

}

requestUpdateStatus(requestId:any,request:any) {
  this.requestEquipment.updateStatus(requestId,request)
  .subscribe({
    next: (data) => {
   this.retrieveEquipments(request.userId.id)
    },
    error: (e) => console.error(e)
  });
}

  }

 