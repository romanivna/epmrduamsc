import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Education } from 'app/declarations';

@Component({
  selector: 'app-education-item-preview',
  templateUrl: './education-item-preview.component.html',
  styleUrls: ['./education-item-preview.component.scss']
})
export class EducationItemPreviewComponent implements OnInit {

  private readonly educationItemContentMaxLength = 256;
  private cuttedEducationItem: Education;

  @Input() public set educationItem(item) {
    item.description = this.cutEducationItemContent(item.description);
    this.cuttedEducationItem = item;
  };

  @Input() public extended = false;

  public get educationItem() {
    return this.cuttedEducationItem;
  }

  constructor(private router: Router) { }

  private cutEducationItemContent(educationItemContent): string {
    if ( !educationItemContent ) {
      educationItemContent =  ' ';
    } else if (educationItemContent.length > this.educationItemContentMaxLength) {
      educationItemContent = educationItemContent.replace(/<img[^>]+>/g, '')
        .slice(0, this.educationItemContentMaxLength);
      return educationItemContent.slice(0, educationItemContent.lastIndexOf(' ')) + ' ...';
    }
    return educationItemContent;
  }

  ngOnInit() {
  }

}
