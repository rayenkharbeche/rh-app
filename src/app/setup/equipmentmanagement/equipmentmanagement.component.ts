import { Component, OnInit } from '@angular/core';
import { Equipment } from '../model/equipment';
import { EquipmentService } from '../service/equipment.service';
import { User } from '../../auth/model/user';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-equipmentmanagement',
  templateUrl: './equipmentmanagement.component.html',
  styleUrl: './equipmentmanagement.component.css'
})
export class EquipmentmanagementComponent implements OnInit {
  form!: FormGroup;

  equipment! : Equipment;
  submitted = false;
  equipments?: Equipment[];
name: any;
reference: any;
user!:User;
validForm: any;
  constructor(private equipmentService: EquipmentService,
    private _activatedroute:ActivatedRoute,
    private accountService: AuthService,
    private formBuilder: FormBuilder,

    ) { }

  
  ngOnInit(): void {
    this.validForm = true;

    const id = this._activatedroute.snapshot.paramMap.get("id");
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      reference: ['', Validators.required],


  });
    this.accountService.getById(id!)
    .subscribe({
      next: (data) => {
        this.user = data;
        this.retrieveEquipments(id);

      },
      error: (e) => console.error(e)

    });
    

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


  saveEquipment(): void {

    if (this.form.invalid) {
      this.validForm = false;
      return;
    }

    console.log(this.name)
    console.log(this.reference)

    const data = {
      name: this.name,
      reference: this.reference,
      user:   this.user
    };


    this.equipmentService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res); 
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

 
  removeAllEquipments(): void {
    this.equipmentService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          //this.retrieveEquipments(id);
        },
        error: (e) => console.error(e)
      });
  }
  removeEquipment(equipment: any): void {
    const id = this._activatedroute.snapshot.paramMap.get("id");

    this.equipmentService.delete(equipment)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.retrieveEquipments(id);
        },
        error: (e) => console.error(e)
      });
  }



}
