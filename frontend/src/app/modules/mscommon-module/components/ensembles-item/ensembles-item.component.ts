import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { ServerGetterService } from '../../../../shared/services/server-getter/server-getter.service';
import { BreadcrumbsService } from '../../../../components/breadcrumbs/breadcrumbs.service';

import { urls } from '../../../../shared/constants/index';
import { Ensemble } from 'app/declarations';
import { ContentPreparatorService } from '../../services';
import { LocalizatorService } from '../../../../shared/services/localizator/localizator.service';


@Component({
  selector: 'app-ensembles-item',
  templateUrl: './ensembles-item.component.html',
  styleUrls: ['./ensembles-item.component.scss']
})
export class EnsemblesItemComponent implements OnInit, OnDestroy {

  public ensembles: Ensemble;
  public showModalWindow = false;
  public description: string;
  public id: any;

  private ngcontent: string;
  private subscriptions = [];
  private currentLang: string;

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
        this.router.navigate([ 'ensembles' ]);
      }
      this.currentLang = data;
    }));
    this.subscriptions.push(this.activatedRoute.params
      .switchMap(({ id }) => this.serverGetter.get(`${ urls.api.prod.ensembles }/${ id }`))
      .subscribe(
        ({ data }) => {
          this.ensembles = <Ensemble>data;
          this.ngcontent = this.myElement.nativeElement
            .innerHTML
            .match(/_ngcontent-c(\d)*/)[0];
          this.description = this.prepareContent(this.ensembles.description);
          this.breadcrumbsService.setBreadcrumbToItemName(this.ensembles.name);
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
