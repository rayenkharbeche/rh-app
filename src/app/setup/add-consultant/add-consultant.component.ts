import { Component } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { ActivatedRoute, Router } from '@angular/router';
  import { AuthService } from '../../auth/service/auth.service';
  import { User } from '../../auth/model/user';
  import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-consultant',
  templateUrl: './add-consultant.component.html',
  styleUrl: './add-consultant.component.css'
})
export class AddConsultantComponent {
  
  

      form!: FormGroup;
      loading = false;
      submitted = false;
    user!: User;
      constructor(
          private formBuilder: FormBuilder,
          private route: ActivatedRoute,
          private router: Router,
          private accountService: AuthService,
          private _activatedroute:ActivatedRoute
          /*private alertService: AlertService*/
      ) { }
    
      ngOnInit() {
        const id = this._activatedroute.snapshot.paramMap.get("id");
  
  this.form = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    birthdayDate: ['', Validators.required],
    entity: ['', Validators.required],
    cotractStartDate: ['', Validators.required],
    poste: ['', Validators.required],
    department: ['', Validators.required],
    leaveCredit: ['', Validators.required],

  });
  
       
  
      }
    
      // convenience getter for easy access to form fields
      get f() { return this.form.controls; }
    
      onSubmit() {
          this.submitted = true;
          console.log(this.form) ;
          // reset alerts on submit
          /*this.alertService.clear();*/
    
          // stop here if form is invalid
          if (this.form.invalid) {
              return;
          }
    
          this.loading = true;
          this.accountService.register(this.form.value)
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