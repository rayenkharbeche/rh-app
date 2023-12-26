import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-profilemanagment',

  templateUrl: './profilemanagment.component.html',
  styleUrl: './profilemanagment.component.css'
})
export class ProfilemanagmentComponent {
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
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', Validators.required],
          birthdayDate: ['', Validators.required],
          entity: ['', Validators.required],
          cotractStartDate: ['', Validators.required],
          poste: ['', Validators.required],
          department: ['', Validators.required],
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
      
  }
}