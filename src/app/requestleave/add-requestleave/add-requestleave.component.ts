import { Component, Pipe, PipeTransform, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestleaveService } from '../service/requestleave.service';
import { first, map } from 'rxjs/operators';
import { User } from '../../auth/model/user';
import { AuthService } from '../../auth/service/auth.service';
import { Requestleave } from '../model/requestleave';
import { RequestleaveType } from '../model/requestleavetype';
import { RequestleaveStatus } from '../model/requestleaveStatus';
import { RequestleaveInterneStatus } from '../model/requestleaveInterneStatus';
import { HolidayService } from '../service/holiday.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-requestleave',
  templateUrl: './add-requestleave.component.html',
  styleUrl: './add-requestleave.component.css'
})
export class AddRequestleaveComponent {



  form!: FormGroup;
  loading = false;
  submitted = false;
  UserId!:User;
  requestLeave!:Requestleave;
  RequestleaveTypes: any;
  holidays!: Date[] ;
  country!: string;
  years: Date[] = [];
  messageError: string = "";
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private requestleaveservice: RequestleaveService,
      private userService: AuthService,
      private holidayService: HolidayService,
      private dialog: MatDialog,

  ) {  
 
    
  }

  ngOnInit() {
    


    var currentUser  = JSON.parse(localStorage.getItem('user')!);
    this.RequestleaveTypes = RequestleaveType;
    this.form = this.formBuilder.group({
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      type: ['', Validators.required],
      status: ['', ],
   
    });
   
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
            response.items.map(item => {

            this.holidays = this.getDatesInRange(new Date (item.start.date), new Date(item.end.date));

              this.holidays.forEach((currentValue, index) => { 
      
                if(currentValue.getFullYear() == new Date().getFullYear()) {
          
                  currentValue.setHours(0);
                  this.years.push(currentValue);
                }
              });
          })
          
          
        });
        if(this.UserId.entity?.countryCode != "Fr"){
   
            delete this.RequestleaveTypes.rttLeave

      }
      }
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  getKeys(obj: any) { return Object.keys(obj); }
  
  onSubmit(ref: TemplateRef<any>) {

      this.submitted = true;
      this.messageError = ""

      console.log(this.UserId) ;
  
      this.form.value.status = RequestleaveStatus.OPEN;
      this.form.value.internestatus = RequestleaveInterneStatus.OPEN;

      this.requestLeave = new Requestleave();
      this.requestLeave.startDate = this.form.value.StartDate;
      this.requestLeave.endDate = this.form.value.EndDate;
      this.requestLeave.leaveType = this.form.value.type;
      this.requestLeave.status = this.form.value.status;
      this.requestLeave.interneStatus = this.form.value.internestatus;
      this.requestLeave.userId = this.UserId;
      this.requestLeave.interneStatus = this.form.value.internestatus;

      if (this.UserId.role?.role == "teamLead"){ 

      this.requestLeave.interneStatus = RequestleaveInterneStatus.TLvalidated;

      }
      const currentDate = new Date();
      //var currentrequestDay = Math.floor((Date.UTC(this.requestLeave.startDate.getFullYear(), this.requestLeave.startDate.getMonth(), this.requestLeave.startDate.getDate()) - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) ) /(1000 * 60 * 60 * 24));
      //var diffEndStartRequest = Math.floor((Date.UTC(this.requestLeave.endDate.getFullYear(), this.requestLeave.endDate.getMonth(), this.requestLeave.endDate.getDate()) - Date.UTC(this.requestLeave.startDate.getFullYear(), this.requestLeave.startDate.getMonth(), this.requestLeave.startDate.getDate()) ) /(1000 * 60 * 60 * 24));
      var diffEndStartRequest= this.calcBusinessDays(this.requestLeave.startDate,this.requestLeave.endDate) 
      var currentrequestDay= this.calcBusinessDays(currentDate,this.requestLeave.startDate) 

      this.requestLeave.leaveDays = diffEndStartRequest;
console.log(this.requestLeave.leaveType)
console.log(currentrequestDay)
console.log(diffEndStartRequest)
console.log(this.messageError)



      if (this.requestLeave.leaveType == "annualLeave"){
        if ( currentrequestDay < ( diffEndStartRequest * 2 ))
        {
          this.messageError = "Time-limit ends";
        }

      }  
      if (this.requestLeave.leaveType == "sickLeave"){

      this.requestleaveservice.getSickLeaveDaysbyuser(this.UserId.id).subscribe({
        next: (data) => {
          console.log(data)
          console.log(this.requestLeave.leaveDays + data )

            if ( (this.requestLeave.leaveDays + data )  > 5 )
            {
              this.messageError = "Sick leave > 5 days ";
            }
    
           
        }})

      }
    

      if (this.messageError != "") {

      this.dialog.open(ref);
      } else
      if (this.messageError == "") {
        console.log("data")
        this.loading = true;
        console.log(this.requestLeave)

      this.requestleaveservice.create(this.requestLeave)
      .pipe(first())
      .subscribe({
          next: () => {
              /*this.alertService.success('Registration successful', { keepAfterRouteChange: true });*/
              this.router.navigate(['/requestleave/requestleavelist'], { relativeTo: this.route });
          },
          error: error => {
              /*this.alertService.error(error);*/
              this.loading = false;
          }
      });
    }
  }


   getDatesInRange(startDate : Date, endDate : Date) {
    const date = new Date(startDate.getTime());
  
    const dates = [];
  
    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
  
    return dates;
  }
  
 dateFilter = (d: Date | null): boolean => {
    // Check if the date is a holiday
    const time=d?.getTime();
    const day = d?.getDay();
    return !this.years?.find(x=>x.getTime()==time) && (day !== 0 && day !== 6);
  };

  calculateDiff(dateSent:any){
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
}

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

excludedHolidays(dDate1:any, dDate2:any) { // input given as Date objects


}
}
