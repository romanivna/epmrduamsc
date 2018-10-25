import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';

import { ServerGetterService, LocalizatorService } from './../../../../shared/services';

import { NewsItem } from './declarations';
import { urls, configurations } from './../../../../shared/constants';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-news-preview',
  templateUrl: 'news-preview.component.html',
  styleUrls: ['news-preview.component.scss'],
  providers: [ServerGetterService]
})
export class NewsPreviewComponent implements OnInit, OnDestroy {

  private showNewsItemsFrom = 0;
  private removedNewsItem: number;

  public extended = false;
  public news: NewsItem[] = [];
  public allNewsLoaded = false;
  public questionForConfirmation: any = null;
  public currentLang: string;
  private localeSubscription: Subscription;
  private count: number;

  constructor(private serverGetterService: ServerGetterService,
              private activatedRoute: ActivatedRoute,
              private localizatorService: LocalizatorService) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot && this.activatedRoute.snapshot.data) {
      this.extended = this.activatedRoute.snapshot.data.extended;
    }
    this.localeSubscription = this.localizatorService.currentLocaleObservable().subscribe(data => {
      this.news = [];
      this.currentLang = data;
      this.showNewsItemsFrom = 0;
      this.allNewsLoaded = false;
      this.getNews();
    });
  }

  ngOnDestroy() {
    this.localeSubscription.unsubscribe();
  }



  public changeLanguage() {
    this.showNewsItemsFrom = 0;
    this.allNewsLoaded = false;
    const URLSearchParams = {
      '_start': this.showNewsItemsFrom,
      '_limit': configurations.newsPreview.loadNewsItemsPerRequest,
      '_lang': this.currentLang,
    };
    this.serverGetterService
      .get<NewsItem[]>(urls.api.prod.news, URLSearchParams)
      .subscribe(data => {
        this.news = data.data;
      });
  }

  public onNextNewsItemsClick() {
    this.showNewsItemsFrom += configurations.newsPreview.loadNewsItemsPerRequest;
    this.getNews();
  }

  public suggestToRemove(id: number): void {
    this.removedNewsItem = id;
    let index: number = -1;
    this.news.forEach((value: NewsItem, i: number) => {
      index = (value.id === id) ? i : index;
    });
    this.questionForConfirmation = {
      text: 'confirmationQuestion',
      itemHeader: ` '${ this.news[index].header }' `,
      itemName: 'confirmationQuestionNews'
    };
  }

  private getNews(): void {
    const URLSearchParams = {
      '_start': this.showNewsItemsFrom,
      '_limit': configurations.newsPreview.loadNewsItemsPerRequest,
      '_lang': this.currentLang,
    };
    this.serverGetterService
      .get<NewsItem[]>(urls.api.prod.news, URLSearchParams)
      .subscribe({
        next: this.applyLoadedNews.bind(this),
      });
  }

  private applyLoadedNews(res: any): void {
    this.news = this.news.concat(res.data);
    this.count = res['total-count'];
    this.isAllNewsLoaded(res.data);
  }

  private isAllNewsLoaded(res): void {
    if (res.length < configurations.newsPreview.loadNewsItemsPerRequest || this.count === this.news.length) {
      this.allNewsLoaded = true;
    }
  }


  public decideAboutRemoving(answer: boolean): void {
    this.questionForConfirmation = null;
    if (answer) {
      this.remove();
    } else {
      this.removedNewsItem = null;
    }
  }

  private remove(): void {
    this.serverGetterService.delete(`${ urls.api.prod.news }/${ this.removedNewsItem }`)
        .subscribe(() => {
            this.news = [];
            this.showNewsItemsFrom = 0;
            this.getNews();
          },
          err => console.error
        );
  }
}
