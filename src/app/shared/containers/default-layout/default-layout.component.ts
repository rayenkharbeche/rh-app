import { Component, OnInit } from '@angular/core';

import { navItems } from './_nav';
import { navAdminItems } from './_navAdmin';
import { navItemsTeamLead } from './_navTeamLead';
import { navItemsManager } from './_navManager';
import {navItemsRh } from './_nav_Rh';
import { navItemsInfra } from './_navInfra';
import { navItemsTr } from './_nav_Treasurer';
import { navItemsDG } from './_navDirector';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
  public navItems = navItems;
  public navAdminItems = navAdminItems;
  public navItemsTeamLead = navItemsTeamLead;
  public navItemsManager = navItemsManager;
  public navItemsRh= navItemsRh;
  public navItemsInfra= navItemsInfra;
  public navItemsTr = navItemsTr;
  public navItemsDG = navItemsDG;

  isAdmin!: boolean;
  isConsultant!: boolean;
  isTeamLead!: boolean;
isManager: any;
isRh:any;
isInfra:any;
treasurer:any;
isDirector: any;
  constructor() {


  }
   ngOnInit() : void {
    var currentUser  = JSON.parse(localStorage.getItem('user')!);
    if (currentUser.role === "admin") {
    this.isAdmin = true;
    } else  if (currentUser.role === "consultant")  {
    this.isConsultant = true;
  } else  if (currentUser.role === "teamLead")  {
    this.isTeamLead = true;
  } else  if (currentUser.role === "manager")  {
    this.isManager = true;

  } else  if (currentUser.role === "Rh")  {
    this.isRh = true;
     
   } else  if (currentUser.role === "Infra")  {
    this.isInfra = true;

  }  if (currentUser.role === "treasurer")  {
    this.treasurer = true;

  }   if (currentUser.role === "director")  {
    this.isDirector = true;

  }
  

  
}
}