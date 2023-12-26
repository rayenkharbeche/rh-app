import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {

  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private accountService: AuthService,
      /*private alertService: AlertService*/
  ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
      });
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
      this.accountService.forgotpassword(this.form.value.email)
          .pipe(first())
          .subscribe({
              next: () => {
                  // get return url from query parameters or default to home page
                  const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
                  this.router.navigateByUrl(returnUrl);
              },
              error: error => {
                  /*this.alertService.error(error);*/
                  this.loading = false;
              }
          });
  }
}