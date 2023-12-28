import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
import { User } from '../../auth/model/user';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {

  form!: FormGroup;
  loading = false;
  submitted = false;
user!: User;
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private accountService: AuthService,
      /*private alertService: AlertService*/
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
     
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
   
         
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    var currentUser  = JSON.parse(localStorage.getItem('user')!);

    console.log(this.form.invalid);
    const id = this.route.snapshot.paramMap.get("id");

      this.submitted = true;
      // reset alerts on submit
      /*this.alertService.clear();*/

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }
      this.accountService.getById(id!)
      .subscribe({
        next: (data) => {
          console.log(data);

          this.user = data;

        
          this.user.password = this.form.value.password;
          this.user.token = currentUser.token;
          this.accountService.resetpassword(this.user).subscribe({
            next: (res) => {
              console.log(res);

            },
            error: (e) => console.error(e)
          });
          
        },
        error: (e) => console.error(e)

      });
     
  }
}