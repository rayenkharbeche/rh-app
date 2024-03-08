import { Component } from '@angular/core';
import { HolidayService } from '../../requestleave/service/holiday.service';
import { Holiday } from '../model/holiday-data';
import { HolidayDataService } from '../service/holiday-data.service';

@Component({
  selector: 'app-holiday-managment',
  templateUrl: './holiday-managment.component.html',
  styleUrl: './holiday-managment.component.css'
})
export class HolidayManagmentComponent {

  holidaysData: Holiday[] = [];


  country!:string;
  countrySelected!: string;
  //years: Date[] = [];

  holidays!: Date[] ;
  yearsTn: Holiday[] = [];
  yearsFr: Holiday[] = [];
  tunisiaHoliday:boolean =false
  frenchHoliday:boolean =false
user: any;
  constructor(
   
    //private holidayService: HolidayService,
    private holidayServiceDB: HolidayDataService,

    
) {  

  
}
  ngOnInit() {
    this.retrieveholidayData()
  
  /*this.holidayService.getHolidays("tn") 
  .subscribe(response => {
    console.log(response)

      response.items.map(item => {
      this.holidays = this.getDatesInRange(new Date (item.start.date), new Date(item.end.date));
        this.holidays.forEach((currentValue, index) => { 
          console.log(currentValue)

          if(currentValue.getFullYear() == new Date().getFullYear()) {
            console.log(currentValue)
            this.yearsTn.push({ end:currentValue });;
          }
        });
    })})

    this.holidayService.getHolidays("french") 
    .subscribe(response => {
      console.log(response)
      response.items.map(item => {
      this.holidays = this.getDatesInRange(new Date (item.start.date), new Date(item.end.date));

      //console.log(this.holidays)
        this.holidays.forEach((currentValue, index) => { 
      console.log(currentValue)
 

          if(currentValue.getFullYear() == new Date().getFullYear()) {
            this.yearsFr.push({ end:currentValue });
          }
        });
    })*
    
    
  });*/

  
}



getDatesInRange(startDate : Date, endDate : Date) {
  const date = new Date(startDate.getTime());

  const dates = [];

  while (date < endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
console.log(dates)
  return dates;
}

selectCountry() {
  if (this.countrySelected == "tn"){
    this.tunisiaHoliday = true;
    this.frenchHoliday = false;
  }else if (this.countrySelected == "fr"){
    this.frenchHoliday = true;
    this.tunisiaHoliday = false;

  }
}
updateHoliday(arg0: any) {
  throw new Error('Method not implemented.');
  }
  DeleteHoliday(arg0: any) {
  throw new Error('Method not implemented.');
  }
  
CreateHolidayData(){


}
retrieveholidayData(){
  console.log("1")
  this.holidayServiceDB.getAll()
  .subscribe({
    next: (data) => {
    this.holidaysData = data;
    console.log(this.holidaysData)

    this.yearsTn = this.holidaysData.filter(s => s.countryCode == "tn");
    this.yearsFr = this.holidaysData.filter(s => s.countryCode == "fr");


  }
  })
 }
}