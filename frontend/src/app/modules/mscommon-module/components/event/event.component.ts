import { Component, OnInit } from '@angular/core';
import { EventsContentPreviewItem } from '../events-content-preview/declarations';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { ServerGetterService } from '../../../../shared/services';
import { BreadcrumbsService } from '../../../../components/breadcrumbs/breadcrumbs.service';
import { urls } from '../../../../shared/constants';
import { LocalizatorService } from '../../../../shared/services/localizator/localizator.service';


@Component({
  selector: 'app-event',
  templateUrl: 'event.template.html',
  styleUrls: ['event.styles.scss']
})
export class EventComponent implements OnInit {
  public event: EventsContentPreviewItem;
  public eventHeader: any;
  public eventBody: any;
  private id: number;
  private currentLang: string;

  constructor(private serverGetterService: ServerGetterService,
    private breadcrumbsService: BreadcrumbsService,
              private route: ActivatedRoute,
              private localizatorService: LocalizatorService,
              private router: Router) { }

  ngOnInit() {
    this.localizatorService.currentLocaleObservable().subscribe(data => {
      if (this.currentLang !== data && this.currentLang) {
        this.router.navigate([ 'events' ]);
      }
      this.currentLang = data;
    });
    this.route.params.subscribe((params: Params) => {
      this.id = +params['breadcrumb'];
      this.getEvent();
    });
  }

  getEvent() {
    const url: string = urls.api.prod.events;
    this.serverGetterService
        .get<EventsContentPreviewItem>(`${ url }/${ this.id }`)
        .subscribe(({ data }) => {
          this.event = data;
          this.eventHeader = {
            title: data.title,
            place: data.place,
            time: {},
            img: {
              id: '',
              link: '',
              title: ''
            },
            date: {
              start: '',
              end: ''
            }
          };
          this.eventHeader.img = data.img;
          this.eventHeader.date.start = data.date[0];
          this.eventHeader.date.end = (data.date.length === 2) ? data.date[1] : '';
          const prepareTime = (time) => {
            const [ hours, mins ] = time.split(':');
            return (+hours <= 12) ? `${ time } AM` : `${ parseInt(hours, 10) - 12 }:${ mins } PM`;
          };
          this.eventHeader.time.from = prepareTime((new Date(+data.date[0]))
                                        .toString()
                                        .match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/g)[0]
                                        .substr(0, 5));
          this.eventHeader.time.to = prepareTime((new Date(+data.date[1] || +data.date[0]))
                                      .toString()
                                      .match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/g)[0]
                                      .substr(0, 5));
          this.eventBody = {
            title: data.title,
            description: data.description
          };
          this.breadcrumbsService.setBreadcrumbToItemName(this.event.title);
        });
  }

}
