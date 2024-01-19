import { Component } from '@angular/core';
import { DepartmentService } from '../service/department.service';
import { TeamService } from '../service/team.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../auth/service/auth.service';
import { Department } from '../model/department';
import { User } from '../../auth/model/user';
import { Team } from '../model/team';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrl: './update-team.component.css'
})
export class UpdateTeamComponent {

consultant: any;

department: any;
  choosedepartment: boolean = true;
chooseconsultant!: boolean;
chooseteamlead!: boolean;
name: any;

  constructor(private DepartmentService: DepartmentService,
    private Teamservice: TeamService,
    private router: Router,
    private _activatedroute:ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: AuthService  ) { }

  departments?: Department[];
  show_Users!:boolean;
  users!:User[];
  form!: FormGroup;
  loading = false;
  team!:Team;
  teams!:Team[];
  teamlead!:User;
  teamleads!:User[];

ngOnInit() {
  const id = this._activatedroute.snapshot.paramMap.get("id");
  var currentUser  = JSON.parse(localStorage.getItem('user')!);

  this.retrieveDepartments();
  this.form = this.formBuilder.group({
    customers: null,
    orders: null,
  });
  this.Teamservice.get(id!)
  .subscribe({
    next: (data) => {
      this.team = data;
      this.department = this.team.department;
      this.consultant = this.team.consultant;
      this.teamlead = this.team.teamlead;
      this.name = this.team.name;
     
    },
    error: (e) => console.error(e)

  });
 

 
}
onChangeteam() {
  this.choosedepartment = false;
  this.chooseteamlead = false;
  this.chooseconsultant = true;  
  var teams : User[];
teams = this.teamleads;
  for (let user of teams) {
    console.log(this.teamlead);
    if (this.teamlead.id !== user.id) {
      console.log(teams)

        break;
    }

}
console.log(this.users)

}
onChange() {
this.choosedepartment = false;
  this.chooseteamlead = true;
this.retrieveUsers(this.department.id)
}
 
  retrieveDepartments(): void {
    this.DepartmentService.getAll()
      .subscribe({
        next: (data) => {
          this.departments = data;
        },
        error: (e) => console.error(e)
      });
  }

  retrieveUsers(department: any){
    this.show_Users =true;
      this.userService.getAlluserbyDepartment(department)
      .subscribe({
        next: (data) => {
          this.teamleads = data;
          this.users = data;

        },
        error: (e) => console.error(e)
      });
    
      }
    
      
      onSubmit(){


console.log(this.department)
console.log(this.consultant)
this.team.department = this.department;
this.team.teamlead = this.teamlead;
this.team.name = this.name;
/*const data = {
  name: this.entity.name,
  department: this.t.countryCode
};*/
this.Teamservice.update(this.team.id,this.team)
.subscribe({
  next: (res) => {
    var users : User[];
    console.log(res)

  /*update liste users where  */
  /*this.users= this.users.splice(this.users.indexOf(this.teamlead));*/
console.log(this.users)
    this.userService.updateteamlead(this.teamlead.id!, res)
    .subscribe({
      next: (res) => {
      }})
      },
  error: (e) => console.error(e)
});


      }
     



      
}
