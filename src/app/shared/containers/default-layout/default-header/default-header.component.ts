import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { User } from '../../../../auth/model/user';
import { AuthService } from '../../../../auth/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";
  user?: User | null;
   id?:String
  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService, 
    private accountService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    ) {
    
    super();
  }

  ngOnInit() {
  }

  logout() {
    this.accountService.logout();
}

settings(){

  const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home/setup/settings' ;
  this.router.navigateByUrl(returnUrl);  
}
  
}

