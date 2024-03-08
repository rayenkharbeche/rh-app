import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
import { User } from '../../auth/model/user';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { first, firstValueFrom } from 'rxjs';
import { DepartmentService } from '../service/department.service';
import { PosteService } from '../service/poste.service';
import { EntityService } from '../service/entity.service';
import { Entity } from '../model/entity';
import { Poste } from '../model/poste';
import { Department } from '../model/department';
import { Role } from '../../auth/model/role';
import { RoleService } from '../../auth/service/role.service';
import { ContractType } from '../../auth/model/ContractType';

@Component({
  selector: 'app-add-consultant',
  templateUrl: './add-consultant.component.html',
  styleUrl: './add-consultant.component.css'
})
export class AddConsultantComponent {

    form!: FormGroup;
    loading = false;
    submitted = false;
  user!: User;
  

  postResponse: any;
  successResponse!: string;
  i!: number;
  users!: User[];
  isUserConnected!: boolean;
  image!:any;
  response: any;

  entities!: Entity[];
  postes!: Poste[];
  departments!: Department[];

  roles!: Role[];

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
role: any;
rttCredit: any;
rtt: any;
contractType: any;
telephone: any;
address: any;
assurance: any;
matricule: any;
familySituation: any;
childNumber: any;
currentUser:any;
  ContractType: any;
 teamleads! : User[];
 consultants: User[] = [];
 consultant: any;
  chooseSuperior!: boolean;

    constructor(
        private router: Router,
        private _activatedroute:ActivatedRoute,
        private accountService: AuthService,

        private departmentService: DepartmentService,
        private posteService: PosteService,
        private entityService: EntityService,
        private roleService :RoleService

    ) { }
  
    ngOnInit() {
      this.currentUser  = JSON.parse(localStorage.getItem('user')!);
      this.ContractType = ContractType;

      this.entityService.getAll()
      .subscribe({
        next: (data) => {
          this.entities = data;
    }});

        this.posteService.getAll()
        .subscribe({
          next: (data) => {
            this.postes = data;
    }});
      this.departmentService.getAll()
      .subscribe({
        next: (data) => {
          this.departments = data;
  }});
  this.roleService.getAll()
  .subscribe({
    next: (data) => {
      this.roles = data;
}});
 
  
     

    }
  
    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
  
    onChange() { 
      this.rtt = false;
      console.log(this.entity.countryCode);
      if (this.entity.countryCode == "Fr" ) {
        this.rtt = true;        
      }
    }




    
 




    onSubmit() {
      this.submitted = true;

      console.log(this.consultant)
    
      this.user = new User;
      this.user.poste = this.poste;
      this.user.department = this.department;
      this.user.email = this.email;
      this.user.role = this.role;

      this.user.entity = this.entity;
      this.user.firstname = this.firstName;
      this.user.lastName = this.lastName;
      this.user.birthdayDate = this.birthdayDate;
      this.user.contractStartDate = this.contractStartDate;
      this.user.leaveCredit = this.leaveCredit;
      this.user.rttCredit = this.rttCredit;

      this.user.actif = true;

      this.user.password = "Csi@2019";
      this.user.contractType = this.contractType;
      this.user.telephone = this.telephone;
      this.user.address = this.address; 
      this.user.assurance = this.assurance; 
      this.user.matricule = this.matricule;
      this.user.familySituation = this.familySituation;
      this.user.childNumber = this.childNumber; 
      this.user.superior = this.consultant; 
      console.log(this.user)

      this.loading = true;
      this.accountService.addUser(this.user)
      .pipe(first())
      .subscribe({
          next: () => {
              /*this.alertService.success('Registration successful', { keepAfterRouteChange: true });*/
              const returnUrl = this._activatedroute.snapshot.queryParams['returnUrl'] || 'setup/profileList' ;
              this.router.navigateByUrl(returnUrl); 
                      },
          error: error => {
              /*this.alertService.error(error);*/
              this.loading = false;
          }
      });
      
  }
  getKeys(obj: any) { return Object.keys(obj); }

  onChangeDepartment() {    
    this.retrieveUsersbyDepartment(this.department.id)
    }
    retrieveUsersbyDepartment(department: any){
        this.accountService.getAlluserbyDepartment(department)
        .subscribe({
          next: (data) => {
            this.users = data;
            console.log(this.role)
            if(this.role.role == "consultant"){
              //this.teamleads = this.users;
              console.log(this.users)

              for (let user of this.users) {
                if (user.role?.role == "teamLead") {
                     this.consultants.push(user);    
  
                }
              }
            } else  if(this.role.role == "teamLead"){

              for (let user of this.users) {
                console.log(user)

                if (user.role?.role == "manager") {
                this.consultants.push(user);    
                }
              }
            } 

  
          },
          error: (e) => console.error(e)
        });
      
        }
        onChangeconsultant() {
          console.log(this.consultant)
          
          }
          onChangeRole() {
            console.log(this.role)
            this.chooseSuperior = false;
            if (this.role.role == "director" || this.role.role == "admin" ){
              this.chooseSuperior = false;
            }else {
              this.chooseSuperior = true;
            }
            }
}
