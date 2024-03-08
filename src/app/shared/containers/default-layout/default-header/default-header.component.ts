import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { User } from '../../../../auth/model/user';
import { AuthService } from '../../../../auth/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";
  user?: User | null;
   id?:String
   dbImage: any;
   postResponse: any;
   defaultimg! : boolean;
   defaultimage! : string;
  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  currentUser : any;
  constructor(private classToggler: ClassToggleService, 
    private accountService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,

    ) {
    
    super();
  }

  ngOnInit() {
     this.currentUser  = JSON.parse(localStorage.getItem('user')!);
    this.retrieveConsultant();
  }

  logout() {
    this.accountService.logout();
}

settings(){

  const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'settings' ;
  this.router.navigateByUrl(returnUrl);  
}

profile() {

  const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'profile/'+ this.currentUser.id ;
  this.router.navigateByUrl(returnUrl); 

}
  
retrieveConsultant(){

  this.accountService.getById(this.currentUser.id)
  .subscribe({
    next: (data) => {
      this.user = data;
      if (this.user.image! == null ){
        this.defaultimg! = true;
        this.defaultimage! = './assets/img/defautimage.jpg';
        
      }else { 
        this.defaultimg! = false;
        this.getImage(this.user.image.id);
      }

    },
    error: (e) => console.error(e)
  });

}


getImage(id:any) {
 
  console.log(id);
  this.httpClient.get('http://localhost:8080/get/' + id)
    .subscribe(
      res => {
        this.postResponse = res;
        this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;

      }
    );

}
  
}

