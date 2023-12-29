import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../auth/model/user';
import { Entity } from '../model/entity';
import { AuthService } from '../../auth/service/auth.service';
import { HttpClient } from '@angular/common/http';
import { Poste } from '../model/poste';
import { Department } from '../model/department';
interface IUser {
    id?: string;
    email?: string;
    password?: string;
    firstname?: string;
    lastName?: string;
    birthdayDate?: string;
    entity?: Entity;
    cotractStartDate?: string;
    poste?: Poste;
    department?: Department;
    token?: string;
    image?:String;
    active?:boolean
    country?:string;
    dbImage?:any

}



@Component({
  selector: 'app-profilelist',
  templateUrl: './profilelist.component.html',
  styleUrl: './profilelist.component.css'
})
export class ProfilelistComponent {
  status!: string;
  dbImage: any;
  postResponse: any;
  users!: IUser[];
  defaultimg! : boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: AuthService,
    private httpClient: HttpClient,


  ) { }
 
  

  selectedId: any ;

  

  
    ngOnInit(): void {
   
      this.retrieveConsultant();

    }
    retrieveConsultant(){
      this.userService.getAll()
      .subscribe({
        next: (data) => {
          this.users = data;
          this.users.map(x =>  {
            console.log(x.image);
if (x.image == null ){
  x.dbImage = './assets/img/defautimage.jpg';
  

}else {   console.log(x.image);

            this.viewImage(x);}
           if ( x.active === false) {
            this.status = "info";
           } else {
            this.status = "success";
           }
           })
        },
        error: (e) => console.error(e)
      });

    }

    updateConsultant( user: User){
      console.log(user);
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home/setup/detail/'+ user.id ;
      this.router.navigateByUrl(returnUrl);   
     }
  
    deleteConsultant (user: User){
      console.log("test");
      this.userService.delete(user.id)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.retrieveConsultant();
          },
          error: (e) => console.error(e)
        });

    }
    viewImage(user: any) {
      if (user.image === null ) return;
      this.httpClient.get('http://localhost:8080/get/image/info/' + user.image)
        .subscribe(
          res => {
            this.postResponse = res;
            this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
            this.users.map(x =>  { x.dbImage = this.dbImage });
          }
        );
    }
    
  
  
  
    
  }
  