// date-filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excludeHolidays'
})
export class ExcludeHolidaysPipe implements PipeTransform {
  transform(dates: Date[], holidays: Date[]): Date[] {
    return dates.filter(date => !this.isHoliday(date, holidays));
  }

  private isHoliday(date: Date, holidays: Date[]): boolean {
    // Check if the date is in the list of holidays
    return holidays.some(holiday => holiday.getTime() === date.getTime());
  }
}
