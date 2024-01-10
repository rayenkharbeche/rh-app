import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
import { User } from '../../auth/model/user';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Image } from '../../auth/model/image';
import { firstValueFrom } from 'rxjs';
import { DepartmentService } from '../service/department.service';
import { PosteService } from '../service/poste.service';
import { EntityService } from '../service/entity.service';
import { Entity } from '../model/entity';
import { Poste } from '../model/poste';
import { Department } from '../model/department';

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
entities!: Entity[];
postes!: Poste[];
departments!: Department[];


    constructor(
        private formBuilder: FormBuilder,
        private httpClient: HttpClient,
        private router: Router,
        private _activatedroute:ActivatedRoute,
        private accountService: AuthService,

        private departmentService: DepartmentService,
        private posteService: PosteService,
        private entityService: EntityService,

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
       
      this.entityService.getAll()
      .subscribe({
        next: (data) => {
          this.entities = data;
    }});

        this.posteService.getAll()
        .subscribe({
          next: (data) => {
            this.postes = data;
    }});
      this.departmentService.getAll()
      .subscribe({
        next: (data) => {
          this.departments = data;
  }});
 
     
      this.accountService.getById(id!)
      .subscribe({
        next: (data) => {
          this.user = data;

          if (this.user!.image !== null ){
          this.getImage(this.user!.image?.id)
          }
          this.form.reset({
            firstName: this.user.firstname,
            lastName: this.user.lastName,
            email: this.user.email,
            poste: this.user.poste?.name,
            department: this.user.department?.name,
            entity:this.user.entity?.name,
            image:this.user.image,

          });
         
        },
        error: (e) => console.error(e)

      });
     

    }
  
    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
  
   



    public onImageUpload(event:any) {
      this.uploadedImage = event.target.files[0];
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
    this.user.poste = new Poste();
    this.user.poste.name = this.form.value.Poste;

    this.user.department = new Department();
    this.user.department.name = this.form.value.department;

    this.user.entity = new Entity();
    this.user.entity.name = this.form.value.entity;
    

    this.user.firstname = this.form.value.firstName;
    this.user.lastName = this.form.value.lastName;
    this.user.birthdayDate = this.form.value.birthdayDate;
    this.user.cotractStartDate = this.form.value.cotractStartDate;
    this.user.poste = this.form.value.poste;
    this.user.department = this.form.value.department;
    this.user.image = this.image;
console.log(this.user.department)
console.log(this.user.poste)

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
