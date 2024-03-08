import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../auth/model/user';
import { Entity } from '../model/entity';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
import { EntityService } from '../service/entity.service';
import { isEmpty } from 'lodash-es';

@Component({
  selector: 'app-transfer-employee',
  templateUrl: './transfer-employee.component.html',
  styleUrl: './transfer-employee.component.css'
})
export class TransferEmployeeComponent {


    form!: FormGroup;
    loading = false;
    submitted = false;
  user!: User;

  /*image: any;*/
  i!: number;
  users!: User[];
  isUserConnected!: boolean;
  imagepath!:any;
  response: any;

  entities: Entity[] = [];


lastName: any;
firstName: any;
  entity: Entity = new Entity;


  entityTo: Entity = new Entity;
    constructor(
        private formBuilder: FormBuilder,
        private httpClient: HttpClient,
        private router: Router,
        private _activatedroute:ActivatedRoute,
        private accountService: AuthService,

        private entityService: EntityService,

    ) { }
  
    ngOnInit() {
      const id = this._activatedroute.snapshot.paramMap.get("id");

      this.accountService.getById(id!)
      .subscribe({
        next: (data) => {
          this.user = data;
          this.firstName = this.user.firstname;
          this.lastName =  this.user.lastName;
          this.entity = this.user.entity!;
          
          this.entityService.getAll()
          .subscribe({
            next: (data) => {
              this.entities = data;
              console.log(this.entities)
              console.log(isEmpty(this.entities))
          
              if(!isEmpty(this.entities) ){
                
               this.entities.forEach((value,index)=>{
                console.log('value')
                console.log(value.id)
                console.log(this.entity.id)

                console.log(value.id==this.entity.id)
            
                if(value.id==this.entity.id) this.entities.splice(index,1);
            
            }); 
               }
    
        }});
        },
        error: (e) => console.error(e)

      });
       
      

  

    }
  

   

 onSubmit() {
  console.log("test")

  const id = this._activatedroute.snapshot.paramMap.get("id");
    this.submitted = true;


    




    this.user.entity = this.entityTo;


    this.loading = true;
    this.accountService.update(id!, this.user)
    .subscribe({
      next: (res) => {
       

        this.accountService.resetInfo(id!, this.user)
        .subscribe({
          next: (res) => {

          }})
        const returnUrl = this._activatedroute.snapshot.queryParams['returnUrl'] || 'setup/profileList' ;
        this.router.navigateByUrl(returnUrl);   
  
        
      },
      
      error: (e) => console.error(e)
    });
}


  }

