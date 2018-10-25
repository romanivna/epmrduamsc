import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { NewsItem } from 'app/declarations';

@Component({
  selector: 'app-news-item-preview',
  templateUrl: 'news-item-preview.component.html',
  styleUrls: ['news-item-preview.component.scss']
})
export class NewsItemPreviewComponent {

  private readonly newsItemContentMaxLength = 256;

  private cuttedNewsItem: NewsItem;

  @Input() public set newsItem(item) {
    item.content = this.cutNewsItemContent(item.content);
    this.cuttedNewsItem = item;
  };

  @Input() public extended = false;

  @Output() removedNewsItem: EventEmitter<number> = new EventEmitter();

  public get newsItem() {
    return this.cuttedNewsItem;
  }

  constructor(private router: Router) { }

  private cutNewsItemContent(newsItemContent): string {
    if (newsItemContent.length > this.newsItemContentMaxLength) {
      newsItemContent = newsItemContent.replace(/<img[^>]+>/g, '')
                                       .slice(0, this.newsItemContentMaxLength);
      return newsItemContent.slice(0, newsItemContent.lastIndexOf(' ')) + ' ...';
    }
    return newsItemContent;
  }

  public remove(): void {
    this.removedNewsItem.emit(this.cuttedNewsItem.id);
  }

}
