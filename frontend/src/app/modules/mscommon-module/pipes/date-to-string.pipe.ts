import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToString'
})
export class DateToStringPipe implements PipeTransform {

  transform(value: string | number, prefix: boolean = false): string {
    if (value === '') {
      return '';
    }
    const date = new Date(+value);
    const DAYS = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    const MONTHS = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    const dateInCorrectFormat = `${ DAYS[+date.getDay()] }, ${ MONTHS[+date.getMonth()] } ${ date.getDate() }.`;
    return (prefix) ? ` - ${ dateInCorrectFormat }` : dateInCorrectFormat;
  }
}
