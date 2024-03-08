
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../../auth/model/user';
import { AuthService } from '../../auth/service/auth.service';
import { AuthorizationService } from '../service/authorization.service';
import { RequestAuthorization } from '../model/requestauthorization';
import { RequestleaveInterneStatus } from '../../requestleave/model/requestleaveInterneStatus';
import { RequestleaveStatus } from '../../requestleave/model/requestleaveStatus';
import { RequestAuthorizationType } from '../model/requestAutorizationtype';
import { HolidayService } from '../../requestleave/service/holiday.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { GeneralcontrolService } from '../../setup/service/generalcontrol.service';

@Component({
  selector: 'app-create-authorization',
  templateUrl: './create-authorization.component.html',
  styleUrl: './create-authorization.component.css'
})
export class CreateAuthorizationComponent {


  

  form!: FormGroup;
  loading = false;
  submitted = false;
  UserId!:User;
  requestAuthorization!:RequestAuthorization;
  RequestauthorisationTypes: any;
  holidays!: Date[] ;
  country!: string;
  years: Date[] = [];
ishomeoffice: any;
type: any;
authorizationstarttime!: any;
authorizationendtime: any;
isexitpermit: any;
selectedStartDate!: Date | null;
selectedEndDate!: Date | null;

selectedTime!: string;
  messageError!: string;
  remoteDays!: number;
 remoteday!: number;
  authorizationMax!: number;
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authorizationService: AuthorizationService,
      private userService: AuthService,
      private holidayService: HolidayService,
      private generalcontrolService: GeneralcontrolService

      /*private alertService: AlertService*/
  ) { }

  ngOnInit() {
    var currentUser  = JSON.parse(localStorage.getItem('user')!);
    this.RequestauthorisationTypes = RequestAuthorizationType;

    this.form = this.formBuilder.group({
      authorisationStartDate: ['', Validators.required],
      authorisationEndDate: ['', Validators.required],

      type: ['', Validators.required],
      status: ['', ],
   
    });
    
    this.generalcontrolService.get(1).subscribe({
      next: (data) => {
        this.remoteday = data.remoteDayMax;
        this.authorizationMax = data.authorizationMaxNbr;
      }})
    this.userService.getById(currentUser.id).subscribe({
      next: (data) => {
        this.UserId = data;

        switch ( this.UserId.entity?.countryCode.toLowerCase() ) {
          case "tn":
            this.country = "tn";
            break;
          case "fr":
            this.country = "french";
              break;
        
       }
        this.holidayService.getHolidays(this.country)
  
        .subscribe(response => {
          this.holidays = response.items.map(item => new Date(item.start.date));
          this.holidays.forEach((currentValue, index) => { 
      
            if(currentValue.getFullYear() == new Date().getFullYear()) {
      
              currentValue.setHours(0);
              this.years.push(currentValue);
            }
          });
          
        });
      }
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  getKeys(obj: any) { return Object.keys(obj); }

  onSubmit() {
      this.submitted = true;
        
    

      this.requestAuthorization                         = new RequestAuthorization();
      this.requestAuthorization.userId                  = this.UserId;
      this.requestAuthorization.type                    = this.type;
      if(this.type == "exitpermit"){

        this.selectedEndDate = this.selectedStartDate;
        var timeParts = this.authorizationstarttime.split(':');
        var hours = parseInt(timeParts[0], 10);
        var minutes = parseInt(timeParts[1], 10);      
    
        var timeParts2 = this.authorizationendtime.split(':');
        var hours2 = parseInt(timeParts2[0], 10);
        var minutes2 = parseInt(timeParts2[1], 10); 
    
        let startdate = new Date(this.selectedStartDate!.getFullYear(), this.selectedStartDate!.getMonth(), this.selectedStartDate!.getDate(),hours,minutes); // Note: the month index starts at zero
        let enddate = new Date(this.selectedEndDate!.getFullYear(), this.selectedEndDate!.getMonth(), this.selectedEndDate!.getDate(),hours2,minutes2); // Note: the month index starts at zero

        this.requestAuthorization.authorisationStartDate  = startdate;
        this.requestAuthorization.authorisationEndDate    = enddate;
      }else {

        this.requestAuthorization.authorisationStartDate  = this.selectedStartDate;
        this.requestAuthorization.authorisationEndDate    = this.selectedEndDate;
        const number = this.calcBusinessDays(this.requestAuthorization.authorisationStartDate,this.requestAuthorization.authorisationEndDate)
        this.requestAuthorization.remoteDays = number
      }
      
    

          this.authorizationService.getRemoteDaysbyuser(this.UserId.id).subscribe({
            next: (data) => {
              this.remoteDays = data
              console.log(data)}
            }
              )
          if (this.requestAuthorization.type == "homeoffice"){
            if ((this.remoteday  - (this.remoteDays! +  this.requestAuthorization.remoteDays) ) < 0 )
            {
              this.messageError = "Time-limit ends";
              return;
            }
         } else if (this.requestAuthorization.type == "exitpermit") {

          const timeParts = this.authorizationstarttime.split(':');
          const hours = parseInt(timeParts[0], 10);
          const minutes = parseInt(timeParts[1], 10);

          const timeParts2 = this.authorizationendtime.split(':');
          const hours2 = parseInt(timeParts2[0], 10);
          const minutes2 = parseInt(timeParts2[1], 10); 
      

          const diffInHours = ( (((minutes2 * 60) + (hours2 * 3600) )  - ((minutes*60) + (hours * 3600) ) ) / 3600 )

          console.log(diffInHours)
          console.log(this.authorizationMax)

          if ( diffInHours > this.authorizationMax )
          {
            this.messageError = "Time-limit ends";
            return;
          }
         }
        this.requestAuthorization.status = RequestleaveStatus.OPEN;
        this.requestAuthorization.interneStatus = RequestleaveInterneStatus.OPEN;
        console.log(this.UserId.role?.role == "teamLead")
        if (this.UserId.role?.role == "teamLead"){ 

          this.requestAuthorization.interneStatus = RequestleaveInterneStatus.TLvalidated;

        }

        console.log(this.requestAuthorization.interneStatus)

      this.loading = true;
      this.authorizationService.create(this.requestAuthorization)
      .pipe(first())
      .subscribe({
          next: () => {
         
              this.router.navigate(['/requestAuthorization/requestAuthorizationlist'], { relativeTo: this.route });
          },
          error: error => {
              /*this.alertService.error(error);*/
              this.loading = false;
          }
      });
      
  }
  dateFilter = (d: Date | null): boolean => {
    // Check if the date is a holiday
    const time=d?.getTime();
    const day = d?.getDay();
    return !this.years?.find(x=>x.getTime()==time) && (day !== 0 && day !== 6);
  };
  onChange() {
console.log(this.type)
this.isexitpermit = false;
this.ishomeoffice = false;

if (this.type == "homeoffice")  {
  this.ishomeoffice = true;
}else if(this.type == "exitpermit"){
  this.isexitpermit = true;
}
  }

  getStartDate(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.selectedStartDate = event.value;
      console.log('Selected Date:', this.selectedStartDate);
    }
  }
  
  getEndDate(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.selectedEndDate = event.value;
      console.log('Selected Date:', this.selectedEndDate);
    }
  }
  /*
  getStartTime() {
    if (this.selectedStartDate && this.authorizationstarttime) {
      const timeParts = this.authorizationstarttime.split(':');
      const hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);

      this.selectedStartDate.setHours(hours);
      this.selectedStartDate.setMinutes(minutes);
      this.form.value.authorisationStartDate = this.selectedStartDate;

      console.log('Selected Date and Time:', this.selectedStartDate);
    }
  }
  getEndTime() {
    this.selectedEndDate = this.selectedStartDate;
    
    console.log(this.selectedStartDate)
    if (this.selectedEndDate && this.authorizationendtime) {
      const timeParts1 = this.authorizationendtime.split(':');
      const hours1 = parseInt(timeParts1[0], 10);
      const minutes1 = parseInt(timeParts1[1], 10);

      this.selectedEndDate.setHours(hours1);
      this.selectedEndDate.setMinutes(minutes1);
      console.log(this.form.value.authorisationStartDate)
      //this.form.value.authorisationEndDate = this.selectedEndDate;

      console.log('Selected Date and Time:', this.selectedEndDate);
    }
  }*/
  calcBusinessDays(dDate1:any, dDate2:any) { // input given as Date objects

    var iWeeks, iDateDiff, iAdjust = 0;
    if (dDate2 < dDate1) return -1; // error code if dates transposed
    console.log(dDate2.getTime() == dDate1.getTime() )
  
    if (dDate2.getTime()  == dDate1.getTime() ) return 1; // error code if dates transposed
    var iWeekday1 = dDate1.getDay(); // day of week
    var iWeekday2 = dDate2.getDay();
    iWeekday1 = (iWeekday1 == 0) ? 7 : iWeekday1; // change Sunday from 0 to 7
    iWeekday2 = (iWeekday2 == 0) ? 7 : iWeekday2;
    if ((iWeekday1 > 5) && (iWeekday2 > 5)) iAdjust = 1; // adjustment if both days on weekend
    iWeekday1 = (iWeekday1 > 5) ? 5 : iWeekday1; // only count weekdays
    iWeekday2 = (iWeekday2 > 5) ? 5 : iWeekday2;
  
    // calculate differnece in weeks (1000mS * 60sec * 60min * 24hrs * 7 days = 604800000)
    iWeeks = Math.floor((dDate2.getTime() - dDate1.getTime()) / 604800000)
    if (iWeekday1 < iWeekday2) { //Equal to makes it reduce 5 days
      iDateDiff = (iWeeks * 5) + (iWeekday2 - iWeekday1)
    } else {
      iDateDiff = ((iWeeks + 1) * 5) - (iWeekday1 - iWeekday2)
    }
    (dDate2 == iDateDiff)
    iDateDiff -= iAdjust // take into account both days on weekend
  
    return (iDateDiff + 1); // add 1 because dates are inclusive
  }

}

