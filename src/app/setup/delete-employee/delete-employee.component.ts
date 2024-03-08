import { Component, Inject, OnInit } from '@angular/core';
import { Entity } from '../model/entity';
import { EntityService } from '../service/entity.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../auth/model/user';
import { AuthService } from '../../auth/service/auth.service';
@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.css'
})
export class DeleteEmployeeComponent {

  
    entity: Entity = {
      id: 0,
      name: '',
      countryCode: '',
    };
    submitted = false;
    entities?: Entity[];

    constructor(private entityService: EntityService,
      private router: Router,
        private _activatedroute:ActivatedRoute,
        public dialogRef: MatDialogRef<DeleteEmployeeComponent>, 
        private userService: AuthService,

        @Inject(MAT_DIALOG_DATA) public data: any        
        ) { }
  
 
  
 
    onCancel(): void { 
      this.dialogRef.close(); 
    } 
 
    deleteConsultant (){
      console.log(this.data)

      this.data.actif = false;
      this.userService.update(this.data.id!,this.data)
        .subscribe({
          next: (res) => {
            this.onCancel();
          },
          error: (e) => console.error(e)
        });

    }
  }