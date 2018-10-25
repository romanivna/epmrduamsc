import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { ServerGetterService } from '../../../../shared/services/server-getter/server-getter.service';
import { BreadcrumbsService } from '../../../../components/breadcrumbs/breadcrumbs.service';

import { urls } from '../../../../shared/constants/index';
import { NewsItem } from 'app/declarations';
import { ContentPreparatorService } from '../../services';
import { LocalizatorService } from '../../../../shared/services/localizator/localizator.service';

@Component({
  selector: 'app-news-item',
  templateUrl: 'news-item.component.html',
  styleUrls: ['news-item.component.scss']
})
export class NewsItemComponent implements OnInit, OnDestroy {

  public newsItem: NewsItem;
  public showModalWindow = false;
  public content: string;
  public id: any;
  public currentLang: string;

  private ngcontent: string;
  private subscriptions = [];

  constructor(private serverGetter: ServerGetterService,
              private activatedRoute: ActivatedRoute,
              private breadcrumbsService: BreadcrumbsService,
              private myElement: ElementRef,
              private contentPreparator: ContentPreparatorService,
              private localizatorService: LocalizatorService,
              private router: Router) { }

  ngOnInit() {
    this.subscriptions.push(this.localizatorService.currentLocaleObservable().subscribe(data => {
      if (this.currentLang !== data && this.currentLang) {
        this.router.navigate([ 'news' ]);
      }
      this.currentLang = data;
    }));
    this.subscriptions.push(this.activatedRoute.params
      .switchMap(({ breadcrumb }) => this.serverGetter.get(`${ urls.api.prod.news }/${ breadcrumb }`))
      .subscribe(
        ({ data }) => {
          this.newsItem = <NewsItem>data;
          this.ngcontent = this.myElement.nativeElement
                               .innerHTML
                               .match(/_ngcontent-c(\d)*/)[0];
          this.content = this.prepareContent(this.newsItem.content);
          this.breadcrumbsService.setBreadcrumbToItemName(this.newsItem.header);
        },
        console.error // notify user, send err to backend, etc
      ));
  }

  private prepareContent(content: string): string {
    content = content.replace(/_ngcontent-c(\d)*/g, this.ngcontent);
    content = this.contentPreparator.changeImgSources(content);
    content = this.contentPreparator.replaceClassNames(content, 'content-box');
    return content;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

}
