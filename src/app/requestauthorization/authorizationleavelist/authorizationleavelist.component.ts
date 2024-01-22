import { Component } from '@angular/core';
import { RequestAuthorization } from '../model/requestauthorization';
import { AuthorizationService } from '../service/authorization.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-authorizationleavelist',
  
  templateUrl: './authorizationleavelist.component.html',
  styleUrl: './authorizationleavelist.component.css'
})
export class AuthorizationleavelistComponent {
  status!: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestauthorizationservice: AuthorizationService,



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

  
    public requests: RequestAuthorization[] = [
      {
        id: 2,
        type: 'maladie',
        authorisationDate: new Date() ,
        statutDemande : 'OPEN',
        user : {
          id: "1"
        }

      },
     
    ];

  
    ngOnInit(): void {
   
      this.retrievRequest();

    }
    retrievRequest(){

      var currentUser  = JSON.parse(localStorage.getItem('user')!);

      this.requestauthorizationservice.getAllbyUser(currentUser.id)
      .subscribe({
        next: (data) => {
          this.requests = data;
          console.log(data);
          
        },
        error: (e) => console.error(e)
      });
    }


    updateRequest( rqleave: RequestAuthorization){
      console.log(rqleave);
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home/requestauthorization/detail/'+ rqleave.id ;
      this.router.navigateByUrl(returnUrl);   
     }
  
    deleteRequest(rqleave: RequestAuthorization){

      console.log("test");
      this.requestauthorizationservice.delete(rqleave.id)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.retrievRequest();
          },
          error: (e) => console.error(e)
        });

    }
    

}
