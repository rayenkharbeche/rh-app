import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
import { User } from '../../auth/model/user';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrl: './updateprofile.component.css'
})
export class UpdateprofileComponent {
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
/*this.accountService.getById(id!).subscribe(v => {

  this.user = v;
});
*/
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

this.accountService.getById(id!)
      .subscribe({
        next: (data) => {
          this.user = data;

          this.form.reset({
            firstName: this.user.firstname,
            lastName: this.user.lastName,
            email: this.user.email,
            poste: this.user.poste?.name,
            department: this.user.department?.name,

          
          });
         
        },
        error: (e) => console.error(e)

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