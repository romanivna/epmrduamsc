import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { ServerGetterService } from '../../../../shared/services/server-getter/server-getter.service';
import { BreadcrumbsService } from '../../../../components/breadcrumbs/breadcrumbs.service';

import { urls } from '../../../../shared/constants/index';
import { Department } from 'app/declarations';
import { ContentPreparatorService } from '../../services';

@Component({
  selector: 'app-departments-item',
  templateUrl: './departments-item.component.html',
  styleUrls: ['./departments-item.component.scss']
})
export class DepartmentsItemComponent implements OnInit, OnDestroy {
  public department: Department;
  public showModalWindow = false;
  public description: string;
  public id: any;

  private ngcontent: string;
  private subscriptions = [];

  constructor(private serverGetter: ServerGetterService,
              private activatedRoute: ActivatedRoute,
              private breadcrumbsService: BreadcrumbsService,
              private myElement: ElementRef,
              private contentPreparator: ContentPreparatorService) { }

  ngOnInit() {
    this.subscriptions.push(this.activatedRoute.params
      .switchMap(({ id }) => this.serverGetter.get(`${ urls.api.prod.departments }/${ id }`))
      .subscribe(
        ({ data }) => {
          this.department = <Department>data;
          this.ngcontent = this.myElement.nativeElement
            .innerHTML
            .match(/_ngcontent-c(\d)*/)[0];
          this.description = this.prepareContent(this.department.description);
          this.breadcrumbsService.setBreadcrumbToItemName(this.department.name);
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
