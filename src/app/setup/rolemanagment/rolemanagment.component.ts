import { Component, OnInit } from '@angular/core';
import { Role } from '../../auth/model/role';
import { RoleService } from '../../auth/service/role.service';

@Component({
  selector: 'app-rolemanagment',
  templateUrl: './rolemanagment.component.html',
  styleUrl: './rolemanagment.component.css'
})

export class RolemanagmentComponent implements OnInit {

  role: Role = {
    id: 0,
    role: '',
  };
  submitted = false;
  roles?: Role[];
  constructor(private roleService: RoleService) { }

  
  ngOnInit(): void {
    this.retrieveRoles();
  }

  retrieveRoles(): void {
    this.roleService.getAll()
      .subscribe({
        next: (data) => {
          this.roles = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  saveRole(): void {
    const data = {
      role: this.role.role,
    };
console.log(data)
    this.roleService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res); 
          this.submitted = true;
          this.retrieveRoles();

        },
        error: (e) => console.error(e)
      });
  }

  newRole(): void {
    this.submitted = false;
    this.role = {
      id: 0 ,
      role: '',
    };
  }
  removeAllRole(): void {
    this.roleService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.retrieveRoles();
        },
        error: (e) => console.error(e)
      });
  }
  removeRole(id: any): void {
    console.log("test");
    this.roleService.delete(id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.retrieveRoles();
        },
        error: (e) => console.error(e)
      });
  }




}
