import { Component, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestleaveService } from '../service/requestleave.service';
import { first } from 'rxjs/operators';
<<<<<<< Updated upstream

=======
import { User } from '../../auth/model/user';
import { AuthService } from '../../auth/service/auth.service';
import { Requestleave } from '../model/requestleave';
import { RequestleaveType } from '../model/requestleavetype';
import { RequestleaveStatus } from '../model/requestleaveStatus';
import { RequestleaveInterneStatus } from '../model/requestleaveInterneStatus';
@Pipe({name: 'enumToArray'})
export class EnumToArrayPipe implements PipeTransform {
  transform(value: { [x: string]: any; }) : Object {
    return Object.keys(value).filter(e => !isNaN(+e)).map(o => { return {index: +o, name: value[o]}});
  }
}
>>>>>>> Stashed changes
@Component({
  selector: 'app-add-requestleave',
  templateUrl: './add-requestleave.component.html',
  styleUrl: './add-requestleave.component.css'
})
export class AddRequestleaveComponent {
[x: string]: any;

  

  form!: FormGroup;
  loading = false;
  submitted = false;
<<<<<<< Updated upstream
=======
  UserId!:User;
  requestLeave!:Requestleave;
  RequestleaveTypes: any;
>>>>>>> Stashed changes
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private requestleaveservice: RequestleaveService,

      /*private alertService: AlertService*/
  ) { 

  }

  ngOnInit() {
<<<<<<< Updated upstream

=======
    var currentUser  = JSON.parse(localStorage.getItem('user')!);
    this.RequestleaveTypes = RequestleaveType;
    
>>>>>>> Stashed changes
    this.form = this.formBuilder.group({
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      user: ['', Validators.required],
      type: ['', Validators.required],
      status: ['', Validators.required],
   
    });
<<<<<<< Updated upstream
    
  }
=======
    this.userService.getById(currentUser.id).subscribe({
      next: (data) => {
        this.UserId = data;
        console.log(this.RequestleaveTypes)

        if(this.UserId.entity?.countryCode != "Fr"){
          //this.RequestleaveTypes= this.RequestleaveTypes.splice(this.RequestleaveTypes.indexOf(RequestleaveType.rttLeave));
            /*if (requestleaveType === RequestleaveType.rttLeave) {
                this.RequestleaveTypes.splice(this.RequestleaveTypes.indexOf(requestleaveType), 1);
                break;
            }*/
            delete this.RequestleaveTypes.rttLeave

      }
      }
  });
  

}
  getKeys(obj: any) { return Object.keys(obj); }
>>>>>>> Stashed changes

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    var currentUser  = JSON.parse(localStorage.getItem('user')!);

      this.submitted = true;
      this.form.value.user = currentUser.id ;
      this.form.value.status = "open";

      console.log(this.form.value) ;
      // reset alerts on submit
      /*this.alertService.clear();*/

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
<<<<<<< Updated upstream
      }

=======
      }*/
      this.form.value.status = RequestleaveStatus.OPEN;
      this.form.value.internestatus = RequestleaveInterneStatus.OPEN;


this.requestLeave = new Requestleave();
this.requestLeave.userId = this.UserId;
this.requestLeave.leaveType = this.form.value.type;

this.requestLeave.startDate = this.form.value.StartDate;
this.requestLeave.endDate = this.form.value.EndDate;
this.requestLeave.status = this.form.value.status;
this.requestLeave.interneStatus = this.form.value.internestatus;

console.log(this.requestLeave.userId)
>>>>>>> Stashed changes
      this.loading = true;
      this.requestleaveservice.create(this.form.value)
      .pipe(first())
      .subscribe({
          next: () => {
              /*this.alertService.success('Registration successful', { keepAfterRouteChange: true });*/
              this.router.navigate(['/login'], { relativeTo: this.route });
          },
          error: error => {
              /*this.alertService.error(error);*/
              this.loading = false;
          }
      });
      
  }
}
