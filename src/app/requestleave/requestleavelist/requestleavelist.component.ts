import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestleaveService } from '../service/requestleave.service';
import { Requestleave } from '../model/requestleave';
import { RequestleaveStatus } from '../model/requestleaveStatus';

@Component({
  selector: 'app-requestleavelist',
  templateUrl: './requestleavelist.component.html',
  styleUrl: './requestleavelist.component.css'
})
export class RequestleavelistComponent {
  status!: string;
  requests!: Requestleave[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestleaveservice: RequestleaveService,


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

  
<<<<<<< Updated upstream
    public requests: Requestleave[] = [
      {
        id: 2,
        startDate: new Date() ,
        endDate: new Date() ,
        leaveType: 'maladie',
        status : 'OPEN',
        user : {
          id: "1"
        }

      },
     
    ];
=======
    
>>>>>>> Stashed changes

  
    ngOnInit(): void {
   
      this.retrievRequest();

    }
    retrievRequest(){

      var currentUser  = JSON.parse(localStorage.getItem('user')!);

      this.requestleaveservice.getAllbyUser(currentUser.id)
      .subscribe({
        next: (data) => {
          this.requests = data;
          console.log(data);
          
        },
        error: (e) => console.error(e)
      });
    }


    updateRequest( rqleave: Requestleave){
      console.log(rqleave);
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home/requestleave/detail/'+ rqleave.id ;
      this.router.navigateByUrl(returnUrl);   
     }
  
    deleteRequest(rqleave: Requestleave){
      rqleave.status = RequestleaveStatus.Inactive;
      rqleave.interneStatus = RequestleaveStatus.Inactive;

      this.requestleaveservice.update(rqleave.id!, rqleave)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.retrievRequest();

                  },
        error: (e) => console.error(e)
      });
      console.log("test");
      /*this.requestleaveservice.delete(rqleave.id)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.retrievRequest();
          },
          error: (e) => console.error(e)
        });*/

    }
    
  
  
  
    
  }
  