import { Component, Inject, OnInit } from '@angular/core';
import { Entity } from '../model/entity';
import { EntityService } from '../service/entity.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-createentity',
  templateUrl: './createentity.component.html',
  styleUrl: './createentity.component.css'
})
export class CreateentityComponent   {
  
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
        public dialogRef: MatDialogRef<CreateentityComponent>, 
      @Inject(MAT_DIALOG_DATA) public data: any
        
        ) { }
  
 
  
    saveEntity(): void {
      const data = {
        name: this.entity.name,
        countryCode: this.entity.countryCode
      };
      console.log(data.countryCode);
  
      this.entityService.create(data)
        .subscribe({
          next: (res) => {
            console.log(res); 
            this.submitted = true;
         this.onCancel();
  
          },
          error: (e) => console.error(e)
        });
    }
    onCancel(): void { 
      this.dialogRef.close(); 
    } 
    newEntity(): void {
      this.submitted = false;
      this.entity = {
        id: 0 ,
        name: '',
        countryCode: '',
      };
    }
  }