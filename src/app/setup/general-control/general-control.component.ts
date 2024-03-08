import { Component, OnInit } from '@angular/core';
import { GeneralControl } from '../model/generalControl';
import { GeneralcontrolService } from '../service/generalcontrol.service';

@Component({
  selector: 'app-general-control',
  templateUrl: './general-control.component.html',
  styleUrl: './general-control.component.css'
})
  export class GeneralControlComponent implements OnInit {

    generalControl: GeneralControl = {
      id: 0,
      authorizationMaxNbr: 0,
      remoteDayMax: 0,

    };
    submitted = false;
  generalControlData!: GeneralControl;
    constructor(private generalcontrolService: GeneralcontrolService) { }
  
    
    ngOnInit(): void {

      this.generalcontrolService.get(1).subscribe({
        next: (data) => {
          this.generalControlData  = data;

         
        }})
    }

authorizationMaxNbr: any;
RemoteDayMax: any;
loading: any;

create() {
  console.log(this.RemoteDayMax)
  const data = {
    authorizationMaxNbr: this.authorizationMaxNbr,
    remoteDayMax: this.RemoteDayMax,
    
  };

  if(this.generalControlData == null)  
{ 
  this.generalcontrolService.create(data)
  .subscribe({
    next: (res) => {
      console.log(res); 
      this.submitted = true;
    },
    error: (e) => console.error(e)
  }); 
}else {
  this.generalcontrolService.update(1,data)
  .subscribe({
    next: (res) => {
      console.log(res); 
      this.submitted = true;
    },
    error: (e) => console.error(e)
  }); 

}
}

}
