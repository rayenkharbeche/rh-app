// holiday.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface HolidayApiResponse {
  items: { start: { date: string } }[];
  // Add any other properties that may exist in the response
}

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  
  private googleCalendarApiUrl = 'https://www.googleapis.com/calendar/v3/calendars/fr.tn%23holiday%40group.v.calendar.google.com/events';

  constructor(private http: HttpClient) { }

  getHolidays(): Observable<HolidayApiResponse> {
    // Add your API key or OAuth token to the request
    //const apiKey = 'AIzaSyC7-oho1KKNWy-CwtU15VXHg5DS270xVrE';
    const apiKey = 'AIzaSyDfKWdpeRjC-731P6PQkR8DsKuuVewHpqc';

    
    const calendarId = 'YOUR_CALENDAR_ID';

    const url = `${this.googleCalendarApiUrl}?key=${apiKey}`;

    return this.http.get<HolidayApiResponse>(url); // Specify the type of the response as 'any'
  }
  
  filterAndSortHolidays(holidays: any[], dateRange: Date[]): Date[] {
    console.log("filterAndSortHolidays")

    const filteredHolidays = holidays
      .sort((a, b) => {
        const dateA = new Date(a.start.date);
        const dateB = new Date(b.start.date);
        console.log(dateA.getTime())

        console.log(dateA.getTime() - dateB.getTime())
        return dateA.getTime() - dateB.getTime();
      });

    return filteredHolidays.map(holiday => new Date(holiday.start.date));
  }
}
