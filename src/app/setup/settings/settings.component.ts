import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit{
  active!:string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    ) {
      }
      ngOnInit() {
        this.active = "true";

      }

  detail(){
    var currentUser  = JSON.parse(localStorage.getItem('user')!);
    console.log(currentUser.id);
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'detail/'+ currentUser.id ;
    this.router.navigateByUrl(returnUrl);  
  }

  reset(){
    var currentUser  = JSON.parse(localStorage.getItem('user')!);

    console.log(localStorage.getItem('user'));
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'reset/'+ currentUser.id ;
    this.router.navigateByUrl(returnUrl);  
  }
}
