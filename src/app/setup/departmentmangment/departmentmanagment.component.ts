
import { Component, OnInit } from '@angular/core';
import { Department } from '../model/department';
import { DepartmentService } from '../service/department.service';

@Component({
  selector: 'app-departmentmanagment',
  templateUrl: './departmentmanagment.component.html',
  styleUrl: './departmentmanagment.component.css'
})
export class DepartmentmanagmentComponent implements OnInit {

  department: Department = {
    id: 0,
    name: '',
  };
  submitted = false;
  departments?: Department[];
  constructor(private DepartmentService: DepartmentService) { }

  
  ngOnInit(): void {
    this.retrieveDepartments();
  }

  retrieveDepartments(): void {
    this.DepartmentService.getAll()
      .subscribe({
        next: (data) => {
          this.departments = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  saveDepartment(): void {
    const data = {
      name: this.department.name,
    };


    this.DepartmentService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res); 
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newDepartment(): void {
    this.submitted = false;
    this.department = {
      id: 0 ,
      name: '',
    };
  }
  removeAllDepartments(): void {
    this.DepartmentService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.retrieveDepartments();
        },
        error: (e) => console.error(e)
      });
  }



}
