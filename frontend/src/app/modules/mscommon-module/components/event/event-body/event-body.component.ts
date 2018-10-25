import {Component, OnInit, Input, ElementRef } from '@angular/core';

import { EventBody } from './declarations';
import { urls } from '../../../../../shared/constants/index';

@Component({
  selector: 'app-event-body',
  templateUrl: 'event-body.template.html',
  styleUrls: ['event-body.styles.scss']
})
export class EventBodyComponent implements OnInit {
  @Input() public set event(value: EventBody) {
    this.title = (value) ? value.title : '';
    this.ngcontent = this.myElement.nativeElement
        .innerHTML
        .match(/_ngcontent-c(\d)*/)[0];
    this.content = (value && value.description) ? this.prepareContent(value.description) : '';
  };
  public selectedImg: string;
  public content: string;
  public title: string;
  private ngcontent: string;

  constructor(private myElement: ElementRef) { }

  ngOnInit() { }

  public onImageClick(e: any) {
    const src: string = e.target.getAttribute('src');
    this.selectedImg = src;
  }
  private prepareContent(content: string): string {
    content = content.replace(/_ngcontent-c(\d)*/g, this.ngcontent);
    content = this.changeImgSources(content);
    content = this.replaceClassNames(content, 'event-body-content');
    return content;
  }

  private changeImgSources(content: string): string {
    function replacer(match) {
      return `src="${ urls.api.prod.images }/${ match.substring(7, match.indexOf(' ')) }"`;
    }
    return content.replace(/\[src\]="\d+? \| imageUrlCreator"/g, replacer);
  }

  private replaceClassNames(content: string, bemBlock: string): string {
    return content.replace(/editor__/g, `${ bemBlock }__`);
  }


}
