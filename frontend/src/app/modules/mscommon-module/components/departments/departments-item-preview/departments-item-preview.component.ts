import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Department } from 'app/declarations';

@Component({
  selector: 'app-departments-item-preview',
  templateUrl: './departments-item-preview.component.html',
  styleUrls: ['./departments-item-preview.component.scss']
})
export class DepartmentsItemPreviewComponent implements OnInit {
  private readonly departmentItemContentMaxLength = 252;
  private cuttedDepartmentItem: Department;

  @Input() public set departmentItem(item) {
    item.description = this.cutDepartmentItemContent(item.description);
    this.cuttedDepartmentItem = item;
  };

  @Input() public extended = false;

  @Output() removedDepartmentItem: EventEmitter<number> = new EventEmitter();

  public get departmentItem() {
    return this.cuttedDepartmentItem;
  }

  constructor(private router: Router) { }

  private cutDepartmentItemContent(departmentItemContent): string {
    if (departmentItemContent.length > this.departmentItemContentMaxLength) {
      departmentItemContent = departmentItemContent.replace(/<img[^>]+>/g, '')
        .slice(0, this.departmentItemContentMaxLength);
      return departmentItemContent.slice(0, departmentItemContent.lastIndexOf(' ')) + ' ...';
    }
    return departmentItemContent;
  }

  public remove(): void {
    this.removedDepartmentItem.emit(this.cuttedDepartmentItem.id);
  }

  ngOnInit() {
  }

}
