import { Component, Pipe, PipeTransform } from '@angular/core';
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

@Component({
  selector: 'app-add-requestleave',
  templateUrl: './add-requestleave.component.html',
  styleUrl: './add-requestleave.component.css'
})
export class AddRequestleaveComponent {

  myHolidayDates = [
    new Date("01/01/2024"),
    new Date("03/11/2024"),
    new Date("03/20/2024")

];
holidays = [
  new Date("01/30/2024"),
  new Date("01/31/2024"),
  new Date("02/5/2024")

];
selectedYear!: number;
years: Date[] = [];
  form!: FormGroup;
  loading = false;
  submitted = false;
  UserId!:User;
  requestLeave!:Requestleave;
  RequestleaveTypes: any;
  //holidays!: Date[] ;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private requestleaveservice: RequestleaveService,
      private userService: AuthService,
      private holidayService: HolidayService

  ) {  
 
    this.holidayService.getHolidays().subscribe((response: { items: any[]; }) => {
      // Extract holiday dates from the API response
      this.holidays = response.items.map(item => new Date(item.start.date));

    });
  }

  ngOnInit() {
    

    this.holidayService.getHolidays()
  
  .subscribe(response => {
    this.holidays = response.items.map(item => new Date(item.start.date));
   
    this.holidays.forEach((currentValue, index) => {
    

      if(currentValue.getFullYear() == new Date().getFullYear()) {

        currentValue.setHours(0);
console.log(currentValue)
        this.years.push(currentValue);
      }
    });
    
  });

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

        if(this.UserId.entity?.countryCode != "Fr"){
   
            delete this.RequestleaveTypes.rttLeave

           

      }
      }
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  getKeys(obj: any) { return Object.keys(obj); }
  
  onSubmit() {

      this.submitted = true;


      console.log(this.UserId) ;
      // reset alerts on submit
      /*this.alertService.clear();*/

      // stop here if form is invalid
      /*if (this.form.invalid) {
          return;
      }*/
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

console.log(this.requestLeave.userId)

      this.loading = true;
      this.requestleaveservice.create(this.requestLeave)
      .pipe(first())
      .subscribe({
          next: () => {
              /*this.alertService.success('Registration successful', { keepAfterRouteChange: true });*/
              this.router.navigate(['/home/requestleave/requestleavelist'], { relativeTo: this.route });
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

}
