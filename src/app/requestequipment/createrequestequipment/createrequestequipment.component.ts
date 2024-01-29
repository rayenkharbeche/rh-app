
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../../auth/model/user';
import { AuthService } from '../../auth/service/auth.service';
import { RequestleaveInterneStatus } from '../../requestleave/model/requestleaveInterneStatus';
import { RequestleaveStatus } from '../../requestleave/model/requestleaveStatus';
import { RequestequipmentModule } from '../requestequipment.module';
import { Requestequipment } from '../model/requestequipment';
import { RequestequipmentService } from '../service/requestequipment.service';
import { RequestEquipmentType } from '../model/requestequipmenttype';
import { RequestEquipmentStatut } from '../model/requestequipmentstatut';

@Component({
  selector: 'app-createrequestequipment',

  templateUrl: './createrequestequipment.component.html',
  styleUrl: './createrequestequipment.component.css'
})
export class CreaterequestequipmentComponent {
[x: string]: any;

  form!: FormGroup;
  loading = false;
  submitted = false;
  UserId!:User;
  requestequipment!:Requestequipment;
  requestEquipmentType:any;
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private userService: AuthService,
      private requestequipmentService: RequestequipmentService,

      /*private alertService: AlertService*/
  ) { }

  ngOnInit() {
    var currentUser  = JSON.parse(localStorage.getItem('user')!);
    this.requestEquipmentType = RequestEquipmentType;

    this.form = this.formBuilder.group({
      authorisationDate: ['', Validators.required],
      type: ['', Validators.required],
      status: ['', ],
      equipmentName: ['', ]

    });
    this.userService.getById(currentUser.id).subscribe({
      next: (data) => {
        this.UserId = data;
      }
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  getKeys(obj: any) { 
    return Object.keys(obj);
   }

  onSubmit() {

      this.submitted = true;


      console.log(this.UserId) ;
      // reset alerts on submit
      /*this.alertService.clear();*/

      // stop here if form is invalid
      /*if (this.form.invalid) {
          return;
      }*/
    
this.requestequipment = new Requestequipment();
this.requestequipment.userId = this.UserId;
this.requestequipment.type = this.form.value.type;
this.requestequipment.equipmentName = this.form.value.equipmentName;

this.requestequipment.status = RequestEquipmentStatut.OPEN;

console.log(this.requestequipment.userId)
      this.loading = true;
      this.requestequipmentService.create(this.requestequipment)
      .pipe(first())
      .subscribe({
          next: () => {
              this.router.navigate(['/home/requestequipment/requestEquipmentlist'], { relativeTo: this.route });
          },
          error: error => {
              /*this.alertService.error(error);*/
              this.loading = false;
          }
      });
      
  }
}

