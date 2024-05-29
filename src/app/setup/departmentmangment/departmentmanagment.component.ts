
import { Component, OnInit } from '@angular/core';
import { Department } from '../model/department';
import { DepartmentService } from '../service/department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-departmentmanagment',
  templateUrl: './departmentmanagment.component.html',
  styleUrl: './departmentmanagment.component.css'
})
export class DepartmentmanagmentComponent implements OnInit {
  form!: FormGroup;
  department: Department = {
    id: 0,
    name: '',
  };
  validForm: any;

  submitted = false;
  departments?: Department[];
  constructor(private DepartmentService: DepartmentService,    
     private formBuilder: FormBuilder,
  ) { }

  
  ngOnInit(): void {
    this.validForm = true;

    this.form = this.formBuilder.group({
      departmentname: ['', Validators.required],
      

  });
    this.retrieveDepartments();
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
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
    console.log(this.form.value.departmentname)
    this.department.name = this.form.value.departmentname;
    const data = {
      name: this.form.value.departmentname,
    };
    if (this.form.invalid) {
      this.validForm = false;
      return;
    }
    this.DepartmentService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res); 
          this.submitted = true;
          this.form.value.departmentname = "";
          this.retrieveDepartments();

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


    
    removeDepartments(poste:any): void {
      this.DepartmentService.delete(poste)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.retrieveDepartments();
          },
          error: (e) => console.error(e)
        });
    }
}
