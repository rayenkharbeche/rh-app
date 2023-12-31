import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
import { User } from '../../auth/model/user';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Image } from '../../auth/model/image';
import { firstValueFrom } from 'rxjs';

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
  /*image: any;*/
  i!: number;
  users!: User[];
  isUserConnected!: boolean;
  image!:Image;
  response: any;


    constructor(
        private formBuilder: FormBuilder,
        private httpClient: HttpClient,
        private router: Router,
        private accountService: AuthService,
        private _activatedroute:ActivatedRoute
    ) { }
  
    ngOnInit() {
      const id = this._activatedroute.snapshot.paramMap.get("id");
      var currentUser  = JSON.parse(localStorage.getItem('user')!);


      if (currentUser.id == id){
      this.isUserConnected = true;
      
      }else{
        this.isUserConnected = false
      }
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
      /* Control
      this.accountService.getAll()
            .subscribe({
              next: (data) => {
                this.users = data;
        },
        error: (e) => console.error(e)

      });*/
     
      this.accountService.getById(id!)
      .subscribe({
        next: (data) => {
          this.user = data;

          if (this.user!.image !== null ){
          this.getImage(this.user!.image?.id)
          /*this.viewImage(this.user!.image?.name );*/
          }
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
  
   



    public onImageUpload(event:any) {
      this.uploadedImage = event.target.files[0];
      /*this.image.name = this.uploadedImage.name;*/

      
      /*this.users.map(x =>  {
        if ( x.image?.name ==  this.uploadedImage.name || this.uploadedImage.name == null  ){
          this.form.value.image = this.user.image?.name;
          return;
  
        }
        
        ;})*/

     

      this.imageUploadAction();
    }

    
  imageUploadAction() {
    const imageFormData = new FormData();
    if (this.uploadedImage != null ) {
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);
     this.httpClient.post('http://localhost:8080/upload/image', imageFormData, { observe: 'response' })
    .subscribe((response) => {
      if (response.status === 200) {
        this.postResponse = response;
        this.successResponse = this.postResponse.body.message;
        this.viewImage(this.uploadedImage.name);

      } else {
        this.successResponse = 'Image not uploaded due to some error!';
      }
    }
    );  
  }
    else {
      
      console.log("error")
    }

          
    
    }

  viewImage(data:any) {
    this.httpClient.get('http://localhost:8080/get/image/info/' + data)
      .subscribe(
        res => {
          this.postResponse = res;
          this.image = new Image();
          this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
          this.image.id = this.postResponse.id;
          this.image.name = this.postResponse.name;
          this.image.type = this.postResponse.type;
          this.image.image =  this.postResponse.image;

        }
      );
  }
getImage(id:any) {
 
  this.httpClient.get('http://localhost:8080/get/' + id)
    .subscribe(
      res => {
        this.postResponse = res;
        this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;

        /*this.image.id = this.postResponse.id;
        this.image.name = this.postResponse.na;
        this.image.type = this.postResponse.type;

        this.image.image = this.postResponse.image;*/

      }
    );

}
 onSubmit() {
  const id = this._activatedroute.snapshot.paramMap.get("id");
  console.log(this.form.value); 
    this.submitted = true;
    // reset alerts on submit
    /*this.alertService.clear();*/

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
    //this.viewImage(this.uploadedImage.name);
    //this.getImage(this.image.id);
    /*this.response = "";
    this.response = await this.imageUploadAction();*/
    
console.log(this.image);
    this.user.firstname = this.form.value.firstName;
    this.user.lastName = this.form.value.lastName;
    this.user.birthdayDate = this.form.value.birthdayDate;
    this.user.cotractStartDate = this.form.value.cotractStartDate;
    this.user.entity = this.form.value.entity;
    this.user.poste = this.form.value.poste;
    this.user.department = this.form.value.department;
    this.user.image = this.image;


    this.loading = true;
    this.accountService.update(id!, this.user)
    .subscribe({
      next: (res) => {
        if (this.isUserConnected == true ) {
          const returnUrl = this._activatedroute.snapshot.queryParams['returnUrl'] || 'home/setup/settings' ;
          this.router.navigateByUrl(returnUrl);   

        } else {
        const returnUrl = this._activatedroute.snapshot.queryParams['returnUrl'] || 'home/setup/profileList' ;
        this.router.navigateByUrl(returnUrl);   
  
      }
                },
      error: (e) => console.error(e)
    });
}


  }
