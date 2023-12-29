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
  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService, 
    private accountService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,

    ) {
    
    super();
  }

  ngOnInit() {

this.retrieveConsultant();
  }

  logout() {
    this.accountService.logout();
}

settings(){

  const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home/setup/settings' ;
  this.router.navigateByUrl(returnUrl);  
}
retrieveConsultant(){
  var currentUser  = JSON.parse(localStorage.getItem('user')!);

  this.accountService.getById(currentUser.id)
  .subscribe({
    next: (data) => {
this.viewImage(data);

      
    },
    error: (e) => console.error(e)
  });

}

viewImage(user: any) {
  this.httpClient.get('http://localhost:8080/get/image/info/' + user.image)
    .subscribe(
      res => {
        this.postResponse = res;
        this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
      }
    );
}
  
}

