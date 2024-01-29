import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
import { User } from '../../auth/model/user';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Image } from '../../auth/model/image';
import { first, firstValueFrom } from 'rxjs';
import { DepartmentService } from '../service/department.service';
import { PosteService } from '../service/poste.service';
import { EntityService } from '../service/entity.service';
import { Entity } from '../model/entity';
import { Poste } from '../model/poste';
import { Department } from '../model/department';
import { Role } from '../../auth/model/role';
import { RoleService } from '../../auth/service/role.service';

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
  /*image: any;*/
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

    constructor(
        private formBuilder: FormBuilder,
        private httpClient: HttpClient,
        private router: Router,
        private _activatedroute:ActivatedRoute,
        private accountService: AuthService,

        private departmentService: DepartmentService,
        private posteService: PosteService,
        private entityService: EntityService,
        private roleService :RoleService

    ) { }
  
    ngOnInit() {
      var currentUser  = JSON.parse(localStorage.getItem('user')!);
      
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


      this.loading = true;
      this.accountService.addUser(this.user)
      .pipe(first())
      .subscribe({
          next: () => {
              /*this.alertService.success('Registration successful', { keepAfterRouteChange: true });*/
              const returnUrl = this._activatedroute.snapshot.queryParams['returnUrl'] || 'home/setup/profileList' ;
              this.router.navigateByUrl(returnUrl); 
                      },
          error: error => {
              /*this.alertService.error(error);*/
              this.loading = false;
          }
      });
      
  }
}
