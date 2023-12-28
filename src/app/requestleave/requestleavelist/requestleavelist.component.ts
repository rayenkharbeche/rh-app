import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestleaveService } from '../service/requestleave.service';
import { Requestleave } from '../model/requestleave';

@Component({
  selector: 'app-requestleavelist',
  templateUrl: './requestleavelist.component.html',
  styleUrl: './requestleavelist.component.css'
})
export class RequestleavelistComponent {
  status!: string;
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

  
    public requests: Requestleave[] = [
      {
        id: 2,
        StartDate: new Date() ,
        EndDate: new Date() ,
        type: 'maladie',
        status : 'OPEN',
        user : {
          id: "1"
        }

      },
     
    ];

  
    ngOnInit(): void {
   
      this.retrievRequest();

    }
    retrievRequest(){
      /*this.requestleaveservice.getAll()
      .subscribe({
        next: (data) => {
          this.requests = data;
          console.log(data);
          
        },
        error: (e) => console.error(e)
      });
*/
    }

    updateConsultant( rqleave: Requestleave){
      console.log(rqleave);
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home/setup/detail/'+ rqleave.id ;
      this.router.navigateByUrl(returnUrl);   
     }
  
    deleteConsultant (rqleave: Requestleave){
      console.log("test");
      this.requestleaveservice.delete(rqleave.id)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.retrievRequest();
          },
          error: (e) => console.error(e)
        });

    }
    
  
  
  
    
  }
  