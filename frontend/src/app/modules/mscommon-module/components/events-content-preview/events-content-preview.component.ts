import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ServerGetterService, LocalizatorService } from './../../../../shared/services';
import { urls, configurationEventsPreview, configurations } from './../../../../shared/constants';
import { DatePipe } from '@angular/common';
import { EventsContentPreviewItem } from './declarations/index';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { DateToStringPipe } from '../../pipes/date-to-string.pipe';

@Component({
  selector: 'app-events-content-preview',
  templateUrl: 'events-content-preview.template.html',
  styleUrls: ['events-content-preview.styles.scss'],
  providers : [DatePipe]
})
export class EventsContentPreviewComponent implements OnInit, OnDestroy {
  private showEventsItemsFrom = 0;
  public eventsContentPreviewItems: EventsContentPreviewItem[];
  public allEventsLoaded = false;
  private canLoadNewEvents = true;
  public eventsItemsCountPerRequest = configurations.eventsPreview.loadEventsItemsPerRequest;
  public amountofelements = configurationEventsPreview.eventsPreview.amountofelements;
  public extended = false;
  private removedEventItem: number;
  public questionForConfirmation: any = null;
  private currentLang: string;
  private localeSubscription: Subscription;
  public dateToString: DateToStringPipe = new DateToStringPipe();

  @Input()
  public isArrowToLoadMore = true;
  @Input()
  public loadEventsItemsPerRequest = configurationEventsPreview.eventsPreview.loadEventsItemsPerRequest;


  constructor(private serverGetterService: ServerGetterService,
              private datePipe: DatePipe,
              private activatedRoute: ActivatedRoute,
              private localizatorService: LocalizatorService
  ) {

  }
  ngOnInit() {
    if (this.activatedRoute.snapshot && this.activatedRoute.snapshot.data) {
      this.extended = this.activatedRoute.snapshot.data.extended;
    }
    this.localeSubscription = this.localizatorService.currentLocaleObservable().subscribe(data => {
      this.eventsContentPreviewItems = [];
      this.currentLang = data;
      this.showEventsItemsFrom = 0;
      this.allEventsLoaded = false;
      this.getEvents();
    });
  }

  ngOnDestroy() {
    this.localeSubscription.unsubscribe();
  }

  private isDatesInSameDay(date: any): boolean {
    return this.dateToString.transform(date[0]) === this.dateToString.transform(date[1]);
  }

  private getEvents(): void {
    const URLSearchParams = {
      '_start': this.showEventsItemsFrom,
      '_limit': this.loadEventsItemsPerRequest,
      '_sort': 'id',
      '_lang': this.currentLang
    };
    this.serverGetterService
      .get<EventsContentPreviewItem[]>(urls.api.prod.events, URLSearchParams)
      .subscribe({
        next: this.onLoadEvents.bind(this),
        error: this.onLoadEventsError
      });
  }

  private onLoadEvents(res): void {
    res.data = res.data.map((resItem) => {
      if (!Array.isArray(resItem.date)) {
        resItem.date = [resItem.date];
      }
      const prepareTime = (time) => {
        const [ hours, mins ] = time.split(':');
        return `${ time } `;
      };
      resItem.time = {};
      resItem.time.from = prepareTime((new Date(+resItem.date[0]))
        .toString()
        .match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/g)[0]
        .substr(0, 5));
      resItem.time.to = prepareTime((new Date(+resItem.date[1] || +resItem.date[0]))
        .toString()
        .match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/g)[0]
        .substr(0, 5));
      return resItem;
    });
    this.eventsContentPreviewItems = this.eventsContentPreviewItems.concat(res.data);
    this.showEventsItemsFrom += this.loadEventsItemsPerRequest;
    const totalCount = res['total-count'];
    if (res.data.length < this.loadEventsItemsPerRequest || totalCount === this.amountofelements) {
      this.allEventsLoaded = true;
    }
    this.canLoadNewEvents = true;
    this.isArrowToLoadMore = this.activatedRoute.snapshot.data['breadcrumb'] === 'home';
  };

  private onLoadEventsError(error): void {
    this.canLoadNewEvents = true;
    console.log(error);
  }

  public onNextEventsItemsClick() {
    if (this.canLoadNewEvents) {
      this.canLoadNewEvents = false;
      this.getEvents();
    }
  }

  public isPastEvent(event): boolean {
    const timeArrFull: Array<string> = event.time.to.split(' '); // ['hh:mm', 'A.M./P.M.']
    const isPostMeridiem: boolean = (timeArrFull[1] === 'PM');
    const timeArr: Array<string> = timeArrFull[0].split(':'); // ['hh', 'mm']
    const hours: number = isPostMeridiem ? +timeArr[0] + 12 : +timeArr[0];
    const minutes: number = +timeArr[1];
    const msec: number = (hours * 60 + minutes) * 60 * 1000;
    return (parseInt(event.date[1] || event.date[0], 10) + msec) < Date.now();
  }

  /**
   * Checks if there are start and end dates of event,
   * returns startDateYear === endDateYear (if end date present),
   * so we can cut year duplication in template
   * @param {number | number[]} date
   * @returns {boolean}
   */

  public isSecondDate(date: number | number[]): boolean {
    return !!date[1];
  }
  public isDatesInSameYear(date: number | number[]): boolean {
    return new Date(date[0]).getFullYear() === new Date(date[1]).getFullYear();
  }

  public isDatesInSameMonth(date: number | number[]): boolean {
    return new Date(date[0]).getMonth() === new Date(date[1]).getMonth();
  }

  public suggestToRemove(e: any, id: number): void {
    this.removedEventItem = id;
    let index: number = -1;
    this.eventsContentPreviewItems.forEach((value: EventsContentPreviewItem, i: number) => {
      index = (value.id === id) ? i : index;
    });
    this.questionForConfirmation = {
      text: 'confirmationQuestion',
      itemHeader: ` '${ this.eventsContentPreviewItems[index].header }' `,
      itemName: 'confirmationQuestionEvent'
    };
    e.stopPropagation();
    e.preventDefault();
  }

  public decideAboutRemoving(answer: boolean): void {
    this.questionForConfirmation = null;
    if (answer) {
      this.remove(this.removedEventItem);
    } else {
      this.removedEventItem = null;
    }
  }

  public remove(id: number): void {
    this.serverGetterService.delete(`${ urls.api.prod.events }/${ id }`)
        .subscribe(() => {
            this.eventsContentPreviewItems = [];
            this.showEventsItemsFrom = 0;
            this.allEventsLoaded = false;
            this.canLoadNewEvents = true;
            this.eventsItemsCountPerRequest = configurations.eventsPreview.loadEventsItemsPerRequest;
            this.getEvents();
          },
          error => console.log
      );
  }
}
