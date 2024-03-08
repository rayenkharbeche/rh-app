import { Component, Inject } from '@angular/core';
import { EquipmentService } from '../../setup/service/equipment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Equipment } from '../../setup/model/equipment';
import { Requestequipment } from '../../requestequipment/model/requestequipment';
import { RequestEquipmentStatut } from '../../requestequipment/model/requestequipmentstatut';
import { RequestequipmentService } from '../../requestequipment/service/requestequipment.service';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable, delay, map, of } from 'rxjs';

@Component({
  selector: 'app-requestequipmentanalyse',
  templateUrl: './requestequipmentanalyse.component.html',
  styleUrl: './requestequipmentanalyse.component.css'
})
export class RequestequipmentanalyseComponent {
  FormGroup!: FormGroup; 
  isExist!:boolean;
  message!: boolean;
  refExist!:boolean;
equipmentRef: any;
equipmentsList!: any;
  equipment: Equipment = new Equipment;

  constructor(private equipmentService: EquipmentService,
    private _formBuilder: FormBuilder,
    private requestequipmentService: RequestequipmentService,
      public dialogRef: MatDialogRef<RequestequipmentanalyseComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any
      
      ) { }

      equipments?: Equipment[];

      ngOnInit(): void {
      


      this.FormGroup = this._formBuilder.group({
        equipmentRef: [
          null, [Validators.required],  [this.usernameValidator()]
        ]
      });
    
      this.retrieveEquipments(this.data.equipmentrequest.userId.id,this.data.equipmentName);
      console.log(this.isExist)
      this.equipmentService.getAll()
      .subscribe({
        next: (data) => {
          this.equipmentsList = data.map(x=>x.reference)
        }})
            
      }
      retrieveEquipments(id:any,equipmentName:any): void {
        this.equipmentService.getbyUserIdbyName(id,equipmentName)
          .subscribe({
            next: (data) => {
              this.equipment = data;
              if (this.equipments == null ){
                this.message = true;
              } else {
                this.isExist = true;
              }
            },
            error: (e) => console.error(e)
          });
      }
      validateRequest( rqleave: Requestequipment){
     console.log(this.data.equipmentrequest)
     console.log( !this.message )
     rqleave.interneStatus = RequestEquipmentStatut.Validated;
     rqleave.equipmentRef =  this.FormGroup.value.equipmentRef;

      const data = {
      userId: rqleave.userId,
      type: rqleave.userId,
      status:rqleave.status,
      interneStatus: rqleave.interneStatus,
      equipmentName: rqleave.equipmentName,
      equipmentRef: rqleave.equipmentRef,
      exist:  !this.message 

      };
     

      
        
        this.requestUpdateStatus(rqleave.id!,data );      

    
         }
  
    rejectRequest(rqleave: Requestequipment){

      
      rqleave.interneStatus = RequestEquipmentStatut.Rejected;

      rqleave.status = RequestEquipmentStatut.Rejected;

      this.requestUpdateStatus(rqleave.id!, rqleave);          

      

    }
    requestUpdateStatus(requestId:any,status:any) {
      this.requestequipmentService.updateStatus(requestId,status)
      .subscribe({
        next: (data) => {
       this.onCancel();
        },
        error: (e) => console.error(e)
      });
    }
    onCancel(): void { 
      this.dialogRef.close(); 
    } 
    checkIfUsernameExists(username: string): Observable<boolean> {
      return of(this.equipmentsList.includes(username)).pipe(delay(1000));
    }


      usernameValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
          console.log(control.value)

          return this.checkIfUsernameExists(control.value).pipe(
            map(res => {
              // if res is true, username exists, return true
              if (res == true ){
                this.refExist = true;
                
              } else {
                this.refExist = false;
              }
              return res ? { usernameExists: true } : null;
              // NB: Return null if there is no error
            })
          );
        };
      }
}


   