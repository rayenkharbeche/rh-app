import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../auth/model/user';
import { Entity } from '../model/entity';
import { AuthService } from '../../auth/service/auth.service';
interface IUser {
  id:string
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
}



@Component({
  selector: 'app-profilelist',
  templateUrl: './profilelist.component.html',
  styleUrl: './profilelist.component.css'
})
export class ProfilelistComponent {
  status!: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: AuthService,


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

  
    public users: User[] = [
      {
        id: '2',
        firstName: 'Yiorgos Avraamu',
        lastName: 'New',
        cotractStartDate: 'Jan 1, 2021',
        email: 'benhatrizine@hh.com',
        poste: "consultant",
        birthdayDate: 'Jun 11, 2021 - Jul 10, 2021',
        entity: {
          id: 2,
          name : "string",
          countrycode: "Us",
        },
        department: '10 sec ago',

        picture: './assets/img/avatars/1.jpg',
        active: false,
      },
      /*{
        id: '3',
        name: 'Avram Tarasios',
        state: 'Recurring ',
        registered: 'Jan 1, 2021',
        country: 'Br',
        usage: 10,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        payment: 'Visa',
        activity: '5 minutes ago',
        avatar: './assets/img/avatars/2.jpg',
        status: 'danger',
        color: 'info'
      },
      {
        id: '4',

        name: 'Quintin Ed',
        state: 'New',
        registered: 'Jan 1, 2021',
        country: 'In',
        usage: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        payment: 'Stripe',
        activity: '1 hour ago',
        avatar: './assets/img/avatars/3.jpg',
        status: 'warning',
        color: 'warning'
      },
      {
        id: '5',

        name: 'Enéas Kwadwo',
        state: 'Sleep',
        registered: 'Jan 1, 2021',
        country: 'Fr',
        usage: 98,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        payment: 'Paypal',
        activity: 'Last month',
        avatar: './assets/img/avatars/4.jpg',
        status: 'secondary',
        color: 'danger'
      },
      {
        id: '6',
        name: 'Agapetus Tadeáš',
        state: 'New',
        registered: 'Jan 1, 2021',
        country: 'Es',
        usage: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        payment: 'ApplePay',
        activity: 'Last week',
        avatar: './assets/img/avatars/5.jpg',
        status: 'success',
        color: 'primary'
      },
      {
        id: '7',

        name: 'Friderik Dávid',
        state: 'New',
        registered: 'Jan 1, 2021',
        country: 'Pl',
        usage: 43,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        payment: 'Amex',
        activity: 'Yesterday',
        avatar: './assets/img/avatars/6.jpg',
        status: 'info',
        color: 'dark'
      }*/
    ];

  
    ngOnInit(): void {
      this.userService.getAll()
      .subscribe({
        next: (data) => {
          this.users = data;
          console.log(data);
          this.users.map(x =>  {
           if ( x.active === false) {
            this.status = "info";
           } else {
            this.status = "success";
           }
           })
        },
        error: (e) => console.error(e)
      });
   
    }


    updateConsultant( user: User){
      console.log(user);
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/detail/'+ user.id ;
      this.router.navigateByUrl(returnUrl);   
     }
  
    deleteConsultant (user: User){


    }
  
  
    
  }
  