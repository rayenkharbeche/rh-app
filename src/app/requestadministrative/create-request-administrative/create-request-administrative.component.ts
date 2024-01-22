import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../auth/model/user';
import { Requestadministrative } from '../model/requestadministrative';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
import { RequestadministrativeType } from '../model/requestadministrativetype';
import { RequestadministrativeService } from '../service/requestadministrative.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-request-administrative',
  templateUrl: './create-request-administrative.component.html',
  styleUrl: './create-request-administrative.component.css'
})
export class CreateRequestAdministrativeComponent {
  
  form!: FormGroup;
  loading = false;
  submitted = false;
  UserId!:User;
  
  requestAdministrative!:Requestadministrative;
  
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private requestadministrativeservice: RequestadministrativeService,
      private userService: AuthService,

      /*private alertService: AlertService*/
  ) { }

  ngOnInit() {
    var currentUser  = JSON.parse(localStorage.getItem('user')!);

    this.form = this.formBuilder.group({
     
      type: ['', Validators.required],
  
   
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
      this.form.value.status = RequestadministrativeType.OPEN;


this.requestAdministrative = new Requestadministrative();
this.requestAdministrative.Type = this.form.value.type;
this.requestAdministrative.user = this.UserId;

console.log(this.requestAdministrative.user)
      this.loading = true;
      this. requestadministrativeservice.create(this.requestAdministrative)
      .pipe(first())
      .subscribe({
          next: () => {
              /*this.alertService.success('Registration successful', { keepAfterRouteChange: true });*/
             this.router.navigate(['/home/requestadministrative/requestadministrativelist'], { relativeTo: this.route });
          },
          error: error => {
              /*this.alertService.error(error);*/
              this.loading = false;
          }
      });
      
  }

  

}
