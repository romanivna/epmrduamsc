import { Component, OnInit, OnDestroy } from '@angular/core';
import {ServerGetterService, LocalizatorService} from './../../shared/services';
import {urls} from './../../shared/constants';

@Component(
  {
    selector: 'app-history-page',
    templateUrl: 'history.template.html',
    styleUrls: ['history.styles.scss'],
    providers: [
      ServerGetterService
    ]
  })
export class HistoryComponent implements OnInit, OnDestroy {

  public content: any;
  public contentMain: any;
  private currentLang: string;
  private subscriptions;

  constructor(private serverGetterService: ServerGetterService,
              private localizatorService: LocalizatorService) {}

  ngOnInit() {
    this.content = [];
    this.contentMain = {
    orderNum: '',
    header: '',
    content: '',
    img: {
      link: '',
      id: '',
      title: ''
    },
    lang: {
      id: '',
      name: ''
    }
  };
   this.subscriptions = this.localizatorService.currentLocaleObservable().subscribe(data => {
      this.currentLang = data;
      this.GetContent();
    });
  }

  public GetContent(): void {
    this.serverGetterService.get(`${urls.api.prod.history}?_lang=${this.currentLang}`)
      .subscribe(data => {
        this.content = data.data;
        this.contentMain = this.content[0];
        this.contentMain.lang.name = this.currentLang;
        this.content.splice(0, 1);
    });
  };

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
