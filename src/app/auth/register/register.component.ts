import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { first } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form!: FormGroup;
  loading = false;
  submitted = false;
passwordsMatching: any;
isConfirmPasswordDirty: boolean = false;
confirmPasswordClass: string = 'form-control';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private accountService: AuthService,
      /*private alertService: AlertService*/
  ) { }
  
  ngOnInit() {

      this.form = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', [Validators.required, Validators.minLength(6)]],

      });
      this.form.controls['confirmPassword'].valueChanges.subscribe((val) => {
        if (this.form.controls['password'].value === val) {
          this.passwordsMatching = true;
          this.confirmPasswordClass = 'form-control is-valid';
        } else {
          this.passwordsMatching = false;
          this.confirmPasswordClass = 'form-control is-invalid'
        }
      })
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  
  onSubmit() {

      this.submitted = true;
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