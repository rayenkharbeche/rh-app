import { Component } from '@angular/core';
import { Requestequipment } from '../model/requestequipment';
import { RequestequipmentService } from '../service/requestequipment.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-requestequipmentlist',

  templateUrl: './requestequipmentlist.component.html',
  styleUrl: './requestequipmentlist.component.css'
})

export class RequestequipmentlistComponent {
  status!: string;
  requests!: Requestequipment[] 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestequipmentService: RequestequipmentService,



  ) { }
  item: {
    
    id: string;
    name: string;
    state: string;
    registered: string;
    country: string;
    usage: number;
    period: string;
    payment: string;
    activity: string;
    avatar: string;
    status: string;
    color: string;
  } | undefined;
  

  selectedId: any ;

  

  
    ngOnInit(): void {
   
      this.retrievRequest();

    }
    retrievRequest(){

      var currentUser  = JSON.parse(localStorage.getItem('user')!);

      this.requestequipmentService.getAllbyUser(currentUser.id)
      .subscribe({
        next: (data) => {
          this.requests = data;
          console.log(data);
          
        },
        error: (e) => console.error(e)
      });
    }


    updateRequest( requestequipment: Requestequipment){
      console.log(requestequipment);
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home/requestauthorization/detail/'+ requestequipment.id ;
      this.router.navigateByUrl(returnUrl);   
     }
  
    deleteRequest(requestequipment: Requestequipment){

      console.log("test");
      this.requestequipmentService.delete(requestequipment.id)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.retrievRequest();
          },
          error: (e) => console.error(e)
        });

    }
    

}

