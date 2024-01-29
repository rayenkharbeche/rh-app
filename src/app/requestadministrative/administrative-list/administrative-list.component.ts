import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Requestadministrative } from '../model/requestadministrative';
import { RequestadministrativeService } from '../service/requestadministrative.service';
import { RequestadministrativeStatut } from '../model/requestadministrativestatut';

@Component({
  selector: 'app-administrative-list',

  templateUrl: './administrative-list.component.html',
  styleUrl: './administrative-list.component.css'
})
export class AdministrativeListComponent {

  status!: string;
  requests!: Requestadministrative[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestadministrativeService: RequestadministrativeService,


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

      this.requestadministrativeService.getAllbyUser(currentUser.id)
      .subscribe({
        next: (data) => {
          this.requests = data;
          console.log(data);
          
        },
        error: (e) => console.error(e)
      });
    }


    updateRequest( rqleave: Requestadministrative){
      console.log(rqleave);
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home/requestadministrative/detail/'+ rqleave.id ;
      this.router.navigateByUrl(returnUrl);   
     }
  
    deleteRequest(rqleave: Requestadministrative){

      console.log("test");
      /*this.requestleaveservice.delete(rqleave.id)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.retrievRequest();
          },
          error: (e) => console.error(e)
        });
*/
rqleave.status = RequestadministrativeStatut.Inactive;
rqleave.interneStatus = RequestadministrativeStatut.Inactive;

this.requestadministrativeService.update(rqleave.id!, rqleave)
.subscribe({
  next: (res) => {
    console.log(res);
    this.retrievRequest();

            },
  error: (e) => console.error(e)
});

    }
    
  
  
  
    
  }
  