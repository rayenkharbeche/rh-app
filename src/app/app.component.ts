import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { brandSet, flagSet, freeSet } from '@coreui/icons';

import { IconSetService } from '@coreui/icons-angular';
import { Title } from '@angular/platform-browser';
import { HolidayService } from './requestleave/service/holiday.service';
import { HolidayDataService } from './setup/service/holiday-data.service';
import { Holiday } from './setup/model/holiday-data';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'CSI';
  holidays!: Date[] ;
  yearsTn: { 
    end: Date

  }[] = [];
  yearsFr: { 
    
    end: Date

  }[] = [];
  public icons!: [string, string[]][];
  holidaysData: Holiday[] = [];

  constructor(
    private router: Router,
    private titleService: Title,
        public iconSet: IconSetService,
        private holidayService: HolidayService,
        private holidayDataService: HolidayDataService

  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };

  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
console.log("test")
  this.CreateHolidayData();
    
  }

  CreateHolidayData(){
    this.holidayDataService.getAll()
    .subscribe({
      next: (data) => {
      this.holidaysData = data;
      if (this.holidaysData == null) {


      this.holidayService.getHolidays("tn") 
      .subscribe(response => {
      console.log(response)

      response.items.map(item => {
      this.holidays = this.getDatesInRange(new Date (item.start.date), new Date(item.end.date));
        this.holidays.forEach((currentValue, index) => { 
          console.log(currentValue)

          if(currentValue.getFullYear() == new Date().getFullYear()) {
            console.log(currentValue)
            //this.yearsTn.push({ end:currentValue });
            const data = {
              date: currentValue,
              countryCode : "tn",
              active : true
            };
        
            this.holidayDataService.create(data)
              .subscribe({
                next: (res) => {
                  console.log(res); 
                },
                error: (e) => console.error(e)
              });

          }
        });
    })})

    this.holidayService.getHolidays("french") 
    .subscribe(response => {
      console.log(response)
  
        response.items.map(item => {
        this.holidays = this.getDatesInRange(new Date (item.start.date), new Date(item.end.date));
          this.holidays.forEach((currentValue, index) => { 
            console.log(currentValue)
  
            if(currentValue.getFullYear() == new Date().getFullYear()) {
              console.log(currentValue)
              //this.yearsTn.push({ end:currentValue });
              const data = {
                date: currentValue,
                countryCode : "fr",
                active : true
              };
          
              this.holidayDataService.create(data)
                .subscribe({
                  next: (res) => {
                    console.log(res); 
                  },
                  error: (e) => console.error(e)
                });
            }
          });
      })}) 
      
    }
},
        error: (e) => console.error(e)
      });
  

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
 



}
