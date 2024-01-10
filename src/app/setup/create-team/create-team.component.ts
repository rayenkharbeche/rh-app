import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DepartmentService } from '../service/department.service';
import { TeamService } from '../service/team.service';
import { AuthService } from '../../auth/service/auth.service';
import { Department } from '../model/department';
import { Poste } from '../model/poste';
import { User } from '../../auth/model/user';
import { Team } from '../model/team';
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
name: any;

  constructor(private DepartmentService: DepartmentService,
    private Teamservice: TeamService,
    private formBuilder: FormBuilder,
    private userService: AuthService  ) { }
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

ngOnInit() {
  this.retrieveDepartments();
  this.customerForm = this.formBuilder.group({
    customers: null,
    orders: null,
  });

 
}
onChange() {
this.choosedepartment = false;
  this.chooseteamlead = true;
this.retrieveUsers(this.department.id)
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
          this.teamleads = data;
          this.users = data;

        },
        error: (e) => console.error(e)
      });
    
      }
    
      
      onSubmit(){


console.log(this.department)
console.log(this.consultant)
this.team = new Team();
this.team.department = this.department;
this.team.teamlead = this.teamlead;
this.team.name = this.name;

this.Teamservice.create(this.team)
.subscribe({
  next: (res) => {
    var users : User[];
    console.log(res)

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
     



      
}
