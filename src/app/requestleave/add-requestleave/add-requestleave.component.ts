import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestleaveService } from '../service/requestleave.service';
import { first } from 'rxjs/operators';
import { User } from '../../auth/model/user';
import { AuthService } from '../../auth/service/auth.service';
import { Requestleave } from '../model/requestleave';
import { RequestleaveType } from '../model/requestleavetype';

@Component({
  selector: 'app-add-requestleave',
  templateUrl: './add-requestleave.component.html',
  styleUrl: './add-requestleave.component.css'
})
export class AddRequestleaveComponent {

  

  form!: FormGroup;
  loading = false;
  submitted = false;
  UserId!:User;
  requestLeave!:Requestleave;
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private requestleaveservice: RequestleaveService,
      private userService: AuthService,

      /*private alertService: AlertService*/
  ) { }

  ngOnInit() {
    var currentUser  = JSON.parse(localStorage.getItem('user')!);

    this.form = this.formBuilder.group({
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      type: ['', Validators.required],
      status: ['', ],
   
    });
    this.userService.getById(currentUser.id).subscribe({
      next: (data) => {
        this.UserId = new User();
        this.UserId = data;
      }
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {

      this.submitted = true;


      console.log(this.UserId) ;
      // reset alerts on submit
      /*this.alertService.clear();*/

      // stop here if form is invalid
      /*if (this.form.invalid) {
          return;
      }*/
      this.form.value.status = RequestleaveType.OPEN;


this.requestLeave = new Requestleave();
this.requestLeave.startDate = this.form.value.StartDate;
this.requestLeave.endDate = this.form.value.EndDate;
this.requestLeave.leaveType = this.form.value.type;
this.requestLeave.status = this.form.value.status;
this.requestLeave.interneStatus = this.form.value.internestatus;

console.log(this.requestLeave.userId)

      this.loading = true;
      this.requestleaveservice.create(this.requestLeave)
      .pipe(first())
      .subscribe({
          next: () => {
              /*this.alertService.success('Registration successful', { keepAfterRouteChange: true });*/
              this.router.navigate(['/home/requestleave/requestleavelist'], { relativeTo: this.route });
          },
          error: error => {
              /*this.alertService.error(error);*/
              this.loading = false;
          }
      });
      
  }
}
