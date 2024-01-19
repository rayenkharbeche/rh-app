import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DepartmentService } from '../service/department.service';
import { TeamService } from '../service/team.service';
import { AuthService } from '../../auth/service/auth.service';
import { Department } from '../model/department';
import { Poste } from '../model/poste';
import { User } from '../../auth/model/user';
import { Team } from '../model/team';
import { ActivatedRoute, Router } from '@angular/router';

class Customer {
  public id!: number;
  public name!: string;
  public orderIds!: number[];
}

class Order {
  public id!: number;
}

class DepatmentDto {
  public id!: number;
  public name!: string;
  public consultants!: User[];
}
@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrl: './create-team.component.css'
})
export class CreateTeamComponent {

consultant: any;

department: any;
  choosedepartment: boolean = true;
chooseconsultant!: boolean;
chooseteamlead!: boolean;
choosemanager!: boolean;

name: any;
manager: any;


  constructor(private DepartmentService: DepartmentService,
    private Teamservice: TeamService,
    private formBuilder: FormBuilder,
    private userService: AuthService,
    private router: Router,
        private _activatedroute:ActivatedRoute,  ) { }
    customerForm!: FormGroup;

  filteredOrders!: Order[];
  toppingList = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  departments?: Department[];
  postes?: Poste[];
  show_Users!:boolean;
  users!:User[];
  form!: FormGroup;
  loading = false;
  team!:Team;
  teams!:Team[];
  teamlead!:User;
  teamleads!:User[];
  managers!:User[];

ngOnInit() {
  this.retrieveDepartments();
  


  this.customerForm = this.formBuilder.group({
    customers: null,
    orders: null,
  });

 
}
onChange() {
this.choosedepartment = false;
this.choosemanager = true;

this.retrieveUsers(this.department.id)
}

onChangeManager() {
  this.choosedepartment = false;
  this.chooseteamlead = true;
  this.choosemanager = false;
  var teams : User[];
teams = this.managers;
  for (let user of teams) {
    if (this.manager && this.manager.id !== user.id) {
      console.log(teams)
        this.teamleads= teams.splice(teams.indexOf(user));

        break;
    }
  

}
console.log(this.teamleads)

  }
  onChangeteamLead() {
    this.choosedepartment = false;
    this.chooseteamlead = false;
    this.chooseconsultant = true;  
    var teams : User[];
  teams = this.teamleads;
  console.log(this.teamleads);

    for (let user of teams) {
      console.log(this.teamlead);
      
      if (this.teamlead && this.teamlead.id !== user.id) {
          this.users= teams.splice(teams.indexOf(user));
  
          break;
      }
      
  
  }
  console.log(this.users)
  
    }

  onChangeconsultant() {
    console.log(this.consultant)
    
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
          this.managers = data;


          this.teamleads = data;
          this.users = data;

        },
        error: (e) => console.error(e)
      });
    
      }
    
      
      onSubmit(){


console.log(this.department)
console.log(this.consultant)
console.log(this.manager)

this.team = new Team();
this.team.department = this.department;
/*this.team.teamlead = this.teamlead;*/

this.team.name = this.name;

this.Teamservice.create(this.team)
.subscribe({
  next: (res) => {
    var users : User[];
    console.log(res)
    console.log(this.consultant)
    this.teamlead.teamLead = true;
    this.updateManagerStatus(this.manager.id,res);
    this.updateTeamleadStatus(this.teamlead.id,res);
    this.consultant.push(this.manager);

    this.consultant.push(this.teamlead);
console.log(this.consultant)

    for (let user of this.consultant) {     
    this.userService.updateteamlead(user.id!, res)
    .subscribe({
      next: (res) => {
      }})
    }
   
      },
    error: (e) => console.error(e)
  });


      }
     

updateTeamleadStatus(id:any,data:any){

      this.userService.updateteamleadStatus(id,data)
      .subscribe({
        next: (data) => {
          const returnUrl = this._activatedroute.snapshot.queryParams['returnUrl'] || 'home/setup/teamManagment' ;
          this.router.navigateByUrl(returnUrl);  
        },
        error: (e) => console.error(e)
      });
    
      }
      updateManagerStatus(id:any,data:any){

        this.userService.updatemanagerStatus(id,data)
        .subscribe({
          next: (data) => {
            const returnUrl = this._activatedroute.snapshot.queryParams['returnUrl'] || 'home/setup/teamManagment' ;
            this.router.navigateByUrl(returnUrl);  
          },
          error: (e) => console.error(e)
        });
      
        }


      
}
