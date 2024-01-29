// holiday.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  private googleCalendarApiUrl = 'https://www.googleapis.com/calendar/v3/calendars/fr.tn%23holiday%40group.v.calendar.google.com/events';

  constructor(private http: HttpClient) { }

  getHolidays(): Observable<any> {
    // Add your API key or OAuth token to the request
    //const apiKey = 'AIzaSyC7-oho1KKNWy-CwtU15VXHg5DS270xVrE';
    const apiKey = 'AIzaSyDfKWdpeRjC-731P6PQkR8DsKuuVewHpqc';

    
    const calendarId = 'YOUR_CALENDAR_ID';

    const url = `${this.googleCalendarApiUrl}?key=${apiKey}`;

    return this.http.get(url);
  }
}
