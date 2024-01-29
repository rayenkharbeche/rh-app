
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../../auth/model/user';
import { AuthService } from '../../auth/service/auth.service';
import { AuthorizationService } from '../service/authorization.service';
import { RequestAuthorization } from '../model/requestauthorization';
import { RequestleaveInterneStatus } from '../../requestleave/model/requestleaveInterneStatus';
import { RequestleaveStatus } from '../../requestleave/model/requestleaveStatus';
import { RequestAuthorizationType } from '../model/requestAutorizationtype';

@Component({
  selector: 'app-create-authorization',
  templateUrl: './create-authorization.component.html',
  styleUrl: './create-authorization.component.css'
})
export class CreateAuthorizationComponent {

  

  form!: FormGroup;
  loading = false;
  submitted = false;
  UserId!:User;
  requestAuthorization!:RequestAuthorization;
  RequestauthorisationTypes: any;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authorizationService: AuthorizationService,
      private userService: AuthService,

      /*private alertService: AlertService*/
  ) { }

  ngOnInit() {
    var currentUser  = JSON.parse(localStorage.getItem('user')!);
    this.RequestauthorisationTypes = RequestAuthorizationType;

    this.form = this.formBuilder.group({
      authorisationDate: ['', Validators.required],
      type: ['', Validators.required],
      status: ['', ],
   
    });
    this.userService.getById(currentUser.id).subscribe({
      next: (data) => {
        this.UserId = data;
      }
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  getKeys(obj: any) { return Object.keys(obj); }

  onSubmit() {

      this.submitted = true;


      console.log(this.UserId) ;
      // reset alerts on submit
      /*this.alertService.clear();*/

      // stop here if form is invalid
      /*if (this.form.invalid) {
          return;
      }*/
    
this.requestAuthorization = new RequestAuthorization();
this.requestAuthorization.userId = this.UserId;
this.requestAuthorization.type = this.form.value.type;
this.requestAuthorization.authorisationDate = this.form.value.authorisationDate;
this.requestAuthorization.status = RequestleaveStatus.OPEN;
this.requestAuthorization.interneStatus = RequestleaveInterneStatus.OPEN;

console.log(this.requestAuthorization.userId)
      this.loading = true;
      this.authorizationService.create(this.requestAuthorization)
      .pipe(first())
      .subscribe({
          next: () => {
              this.router.navigate(['/home/requestAuthorization/requestAuthorizationlist'], { relativeTo: this.route });
          },
          error: error => {
              /*this.alertService.error(error);*/
              this.loading = false;
          }
      });
      
  }
}

