import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
import { User } from '../../auth/model/user';
import { HttpClient, HttpEventType } from '@angular/common/http';

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
  
  uploadedImage!: File;
  dbImage: any;
  postResponse: any;
  successResponse!: string;
  image: any;
  i!: number;
  users!: User[];
  isUserConnected!: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private httpClient: HttpClient,
                private router: Router,
        private accountService: AuthService,
        private _activatedroute:ActivatedRoute,
        /*private alertService: AlertService*/
    ) { }
  
    ngOnInit() {
      const id = this._activatedroute.snapshot.paramMap.get("id");
      var currentUser  = JSON.parse(localStorage.getItem('user')!);


      if (currentUser.id == id){
      this.isUserConnected = true;
      
      }else{
        this.isUserConnected = false
      }
console.log(this.isUserConnected );
this.form = this.formBuilder.group({
  firstName: ['', Validators.required],
  lastName: ['', Validators.required],
  email: ['', Validators.required],
  birthdayDate: ['' ],
  entity: [''],
  cotractStartDate: [''],
  poste: ['' ],
  department: [''],
  image: [''],
});
this.accountService.getAll()
      .subscribe({
        next: (data) => {
          this.users = data;
          
         
        },
        error: (e) => console.error(e)

      });
     
this.accountService.getById(id!)
      .subscribe({
        next: (data) => {
          this.user = data;
          this.viewImage(data);
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
      const id = this._activatedroute.snapshot.paramMap.get("id");

        this.submitted = true;
        console.log(this.form) ;
        // reset alerts on submit
        /*this.alertService.clear();*/
  
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
  
        this.loading = true;
        this.accountService.update(id!, this.form.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            const returnUrl = this._activatedroute.snapshot.queryParams['returnUrl'] || 'home/setup/profileList' ;
            this.router.navigateByUrl(returnUrl);   
                    },
          error: (e) => console.error(e)
        });
    }
    public onImageUpload(event:any) {
      this.uploadedImage = event.target.files[0];
      console.log("test");

      console.log(this.uploadedImage.name);
      this.users.map(x =>  {
        if ( x.image ==  this.uploadedImage.name || this.uploadedImage.name == null  ){
          this.form.value.image = this.user.image;
          return;
  
        }
        
        ;})

     

      this.imageUploadAction();
    }

    
  imageUploadAction() {
   this.form.value.image = this.uploadedImage.name;
    const imageFormData = new FormData();
    console.log(this.uploadedImage);
    if (this.uploadedImage != null ) {
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);
    }
    else {
      
      console.log("error")
    }
    /*this.imageService.save(imageFormData)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.router.navigate(['/login'], { relativeTo: this.route });
              this.postResponse = response;
          this.successResponse = this.postResponse.body.message;
                },
              error: error => {
                  this.loading = false;
              }
          });*/
          
console.log(imageFormData);
    this.httpClient.post('http://localhost:8080/upload/image', imageFormData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.postResponse = response;
          console.log(response);
          this.successResponse = this.postResponse.body.message;
          this.viewImage(this.form.value);
        } else {
          this.successResponse = 'Image not uploaded due to some error!';
        }
      }
      );
    }

  viewImage(data:any) {
    this.httpClient.get('http://localhost:8080/get/image/info/' + data.image)
      .subscribe(
        res => {
          this.postResponse = res;
          this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
        }
      );
  }
  }
