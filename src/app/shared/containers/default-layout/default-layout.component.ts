import { Component, OnInit } from '@angular/core';

import { navItems } from './_nav';
import { navAdminItems } from './_navAdmin';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
  public navItems = navItems;
  public navAdminItems = navAdminItems;
  isAdmin!: boolean;

  constructor() {}
   ngOnInit() : void {
    var currentUser  = JSON.parse(localStorage.getItem('user')!);
    console.log(currentUser.role === "admin");

    if (currentUser.role === "admin") {
    this.isAdmin = true;
    } else {
    this.isAdmin = false;
    }
    
   }

 
}
