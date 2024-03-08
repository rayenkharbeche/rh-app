import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
import { User } from '../../auth/model/user';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { image } from '../../auth/model/image';
import { Entity } from '../model/entity';
import { Poste } from '../model/poste';
import { Department } from '../model/department';
import { EquipmentService } from '../service/equipment.service';
import { Equipment } from '../model/equipment';
@Component({
  selector: 'app-employe-profile',
  templateUrl: './employe-profile.component.html',
  styleUrl: './employe-profile.component.css'
})
export class EmployeProfileComponent {


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

entities!: Entity[];
postes!: Poste[];
departments!: Department[];

image :image | undefined;
email: any;
lastName: any;
firstName: any;
entity: any;
poste: any;
Department: any;
department: any;
birthdayDate: any;
contractStartDate: any;
leaveCredit:any;
rttCredit: any;
rtt: any;
equipments?: Equipment[];

  imgContext = { $implicit: 'top', bottom: 'bottom' };
assurance: any;
contractType: any;
telephone: any;
address: any;
matricule: any;
familySituation: any;
childNumber: any;

updatedAt:any;
  superior: any;
    constructor(
        private formBuilder: FormBuilder,
        private httpClient: HttpClient,
        private router: Router,
        private _activatedroute:ActivatedRoute,
        private accountService: AuthService,
        private equipmentService: EquipmentService
    ) { }
  
    ngOnInit() {
      const id = this._activatedroute.snapshot.paramMap.get("id");
      var currentUser  = JSON.parse(localStorage.getItem('user')!);

      this.retrieveEquipments(id);
      if (currentUser.id == id){
      this.isUserConnected = true;
      
      }else{
        this.isUserConnected = false
      }
    
       

 
     
      this.accountService.getById(id!)
      .subscribe({
        next: (data) => {
          this.user = data;
          console.log(this.user )
          if (this.user!.image !== null ){
          this.getImage(this.user!.image?.id)
          }
          else {
            this.dbImage! = './assets/img/defautimage.jpg';
 
          }
          this.firstName        = this.user.firstname;
          this.lastName         =  this.user.lastName;
          this.email            =  this.user.email;
          this.poste            =  this.user.poste?.name;
          this.department       =  this.user.department?.name;
          this.entity           = this.user.entity?.name;
          this.image            = this.user.image;
          this.birthdayDate     = this.user.birthdayDate;
          this.contractStartDate = this.user.contractStartDate;
          this.leaveCredit      = this.user.leaveCredit;
          this.rttCredit        = this.user.rttCredit;

          this.assurance        = this.user.assurance;
          this.contractType     = this.user.contractType;
          this.telephone        = this.user.telephone;
          this.address          = this.user.address;
          this.matricule        = this.user.matricule;
          this.familySituation  = this.user.familySituation;
          this.childNumber      = this.user.childNumber;
          this.updatedAt      = this.user.updatedAt;
          this.superior      = this.user?.superior?.lastName! + ' ' +  this.user?.superior?.firstname! ;


          if (this.entity != null && this.entity.countryCode == "Fr") {
          this.rtt = true;
        }
        },
        error: (e) => console.error(e)

      });
     

    }
  

getImage(id:any) {
 
  this.httpClient.get('http://localhost:8080/get/' + id)
    .subscribe(
      res => {
        this.postResponse = res;
        console.log(this.postResponse.image)
        this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;

      }
    );

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
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}


  }
