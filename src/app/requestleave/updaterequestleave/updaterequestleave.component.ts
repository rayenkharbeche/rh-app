import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../auth/model/user';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { RequestleaveService } from '../service/requestleave.service';
import { Requestleave } from '../model/requestleave';
import { RequestleaveType } from '../model/requestleavetype';

@Component({
  selector: 'app-updaterequestleave',
  templateUrl: './updaterequestleave.component.html',
  styleUrl: './updaterequestleave.component.css'
})
export class UpdaterequestleaveComponent {
    form!: FormGroup;
    loading = false;
    submitted = false;
  user!: User;
  
  uploadedImage!: File;
  dbImage: any;
  postResponse: any;
  successResponse!: string;
  image: any;
  i!: number;
<<<<<<< Updated upstream
  request!: Requestleave;
=======
  requestLeave!: Requestleave;
  RequestleaveTypes: any;
>>>>>>> Stashed changes

    constructor(
        private formBuilder: FormBuilder,
        private httpClient: HttpClient,
        private router: Router,
        private requestleaveService: RequestleaveService,
        private _activatedroute:ActivatedRoute,
    ) { }
  
    ngOnInit() {
      const id = this._activatedroute.snapshot.paramMap.get("id");
      var currentUser  = JSON.parse(localStorage.getItem('user')!);
      
      this.RequestleaveTypes = RequestleaveType;

      this.form = this.formBuilder.group({
        StartDate: ['', Validators.required],
        EndDate: ['', Validators.required],
        user: ['', Validators.required],
        type: ['', Validators.required],
        status: ['', Validators.required],
     
      });

        this.requestleaveService.get(id!)
      .subscribe({
        next: (data) => {
          this.request = data;
          this.form.reset({
            StartDate: this.request.StartDate,
            EndDate: this.request.EndDate,
            user: this.request.user.email,
            type: this.request.type,
            status: this.request.status,

          
          });
         
        },
        error: (e) => console.error(e)

      });
     

    }
    getKeys(obj: any) { return Object.keys(obj); }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
  
    onSubmit() {
      const id = this._activatedroute.snapshot.paramMap.get("id");

        this.submitted = true;
        console.log(this.form) ;
        // reset alerts on submit
        /*this.alertService.clear();*/
  
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
<<<<<<< Updated upstream
  
        this.loading = true;
        this.requestleaveService.update(id!, this.form.value)
=======
        console.log(this.requestLeave.userId) ;

                this.requestLeave.startDate = this.form.value.StartDate;
        this.requestLeave.endDate = this.form.value.EndDate;
        this.requestLeave.leaveType = this.form.value.type;
        this.requestLeave.status = this.form.value.status;
                this.loading = true;
                this.requestleaveService.update(id!, this.requestLeave)
>>>>>>> Stashed changes
        .subscribe({
          next: (res) => {
            console.log(res);
            const returnUrl = this._activatedroute.snapshot.queryParams['returnUrl'] || 'home/setup/requestleaveList' ;
            this.router.navigateByUrl(returnUrl);   
                    },
          error: (e) => console.error(e)
        });
    }
  

    
 
  }

