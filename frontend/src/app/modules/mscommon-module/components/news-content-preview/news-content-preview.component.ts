import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NewsItem } from 'app/declarations';
import { ServerGetterService } from './../../../../shared/services';
import { urls } from './../../../../shared/constants';
import { LocalizatorService } from '../../../../shared/services/localizator';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-news-content-preview',
  templateUrl: 'news-content-preview.template.html',
  styleUrls: ['news-content-preview.styles.scss']
})
export class NewsContentPreviewComponent implements OnInit, OnDestroy {
  public currentLang: string;
  public latestNews: any;
  private subscription;

  constructor(private serverGetterService: ServerGetterService,
              private localizatorService: LocalizatorService) {
  }

  ngOnInit() {
    this.subscription = this.localizatorService.currentLocaleObservable().subscribe(data => {
      this.currentLang = data;
      this.latestNews = this.serverGetterService
        .get<NewsItem[]>(urls.api.prod.news, { '_start': 0, '_limit': 4, '_lang': this.currentLang })
        .map(res => res.data);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
