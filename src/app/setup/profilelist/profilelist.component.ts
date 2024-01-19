import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../auth/model/user';
import { Entity } from '../model/entity';
import { AuthService } from '../../auth/service/auth.service';
import { HttpClient } from '@angular/common/http';
import { Poste } from '../model/poste';
import { Department } from '../model/department';
import { Image } from '../../auth/model/image';
import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';

interface IUser {
    id?: string;
    email?: string;
    password?: string;
    firstname?: string;
    lastName?: string;
    birthdayDate?: string;
    entity?: Entity;
    contractStartDate?: string;
    poste?: Poste;
    department?: Department;
    token?: string;
    image?:Image;
    active?:boolean
    country?:string;
    imagedb?:string;

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
  defaultimage! : string;
  public icons!: [string, string[]][];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: AuthService,
    private httpClient: HttpClient,
    public iconSet: IconSetService

  ) { 
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };


  }
 
  

  selectedId: any ;

  

  
    ngOnInit(): void {
      this.icons = this.getIconsView('cif');

      this.retrieveConsultant();

    }
    getIconsView(prefix: string) {
      return Object.entries(this.iconSet.icons).filter((icon) => {
        return icon[0].startsWith(prefix);
      });
    }
    retrieveConsultant(){
      this.userService.getAll()
      .subscribe({
        next: (data) => {
          this.users = data;
          this.users.map(x =>  {
          if (x.image! == null ){
          this.defaultimg! = true;
          x.imagedb = './assets/img/defautimage.jpg';

          }else { 
            console.log(x.image);
          this.defaultimg! = false;
            x.imagedb = 'data:image/jpeg;base64,' + x.image.image;
          }
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
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home/setup/detail/'+ user.id ;
      this.router.navigateByUrl(returnUrl);   
     }
  
    deleteConsultant (user: User){
      console.log("test");
      this.userService.delete(user.id)
        .subscribe({
          next: (res) => {
            this.retrieveConsultant();
          },
          error: (e) => console.error(e)
        });

    }
    viewImage(user: any) {
      if (user.image === null ) return;
      this.httpClient.get('http://localhost:8080/get/image/info/' + user.image.name)
        .subscribe(
          res => {
            this.postResponse = res;
            this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
            this.users.map(x =>  { x.image!.image = this.dbImage });
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
    
  
  
  
    
  }
  