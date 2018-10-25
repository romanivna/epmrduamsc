import { Component, OnInit, Input, AfterViewChecked, Pipe } from '@angular/core';

import { EventHeader } from './declarations';
import { EventBody } from '../event-body/declarations/';
import { DateToStringPipe } from '../../../pipes/date-to-string.pipe';

@Component({
  selector: 'app-event-header',
  templateUrl: 'event-header.template.html',
  styleUrls: ['event-header.styles.scss']
})
export class EventHeaderComponent implements OnInit {
  @Input() event: EventHeader;
  @Input() eventBody: EventBody;
  public dateToString: DateToStringPipe = new DateToStringPipe();
  public selectedImg: string;


  constructor() { }

  ngOnInit() {
  }

  private isDatesInSameDay(date: any): boolean {
    return this.dateToString.transform(date.start) === this.dateToString.transform(date.end);
  }

   public onImageClick(e: any) {
    const src: string = e.target.getAttribute('src');
    this.selectedImg = src;
  }

  public isPastEvent(): boolean {
    const date = (this.event.date.end + '' !== '') ? +this.event.date.end : +this.event.date.start;
    const timeArrFull: Array<string> = this.event.time.to.split(' '); // ['hh:mm', 'A.M./P.M.']
    const isPostMeridiem: boolean = (timeArrFull[1] === 'P.M.');
    const timeArr: Array<string> = timeArrFull[0].split(':'); // ['hh', 'mm']
    const hours: number = isPostMeridiem ? +timeArr[0] + 12 : +timeArr[0];
    const minutes: number = +timeArr[1];
    const msec: number = (hours * 60 + minutes) * 60 * 1000;
    return (date + msec) < Date.now();
  }
}
