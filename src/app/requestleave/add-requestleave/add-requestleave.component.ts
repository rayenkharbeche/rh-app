import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestleaveService } from '../service/requestleave.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-requestleave',
  templateUrl: './add-requestleave.component.html',
  styleUrl: './add-requestleave.component.css'
})
export class AddRequestleaveComponent {

  

  form!: FormGroup;
  loading = false;
  submitted = false;
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private requestleaveservice: RequestleaveService,

      /*private alertService: AlertService*/
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      user: ['', Validators.required],
      type: ['', Validators.required],
      status: ['', Validators.required],
   
    });
    
  }

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
      }

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
