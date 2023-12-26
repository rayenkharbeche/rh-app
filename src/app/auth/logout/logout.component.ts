import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { User } from '../model/user';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  user?: User | null;

  constructor(private accountService: AuthService) {
      this.accountService.user.subscribe(x => this.user = x);
  }
  ngOnInit() {
    this.logout();
}

  logout() {
      this.accountService.logout();
  }
}
