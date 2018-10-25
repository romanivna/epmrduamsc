import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServerGetterService, LocalizatorService } from '../../../shared/services';
import { Departments } from 'app/declarations';
import { urls } from '../../../shared/constants';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-departments',
  templateUrl: 'departments.template.html',
  styleUrls: ['departments.styles.scss']
})
export class DepartmentsComponent implements OnInit, OnDestroy {
  public currentLang: string;
  private localeSubscription: Subscription;
  public departments = this.serverGetterService
    .get<Departments[]>(`${urls.api.prod.departments}?_lang=${this.currentLang}&_eduType=2`)
    .map(res => res.data)
    .catch(err => Observable.of([]));

  constructor(private serverGetterService: ServerGetterService,
              private localizatorService: LocalizatorService) {
  }

  ngOnInit() {
    this.localeSubscription = this.localizatorService.currentLocaleObservable().subscribe(data => {
      this.currentLang = data;
      this.changeLanguage();
    });
  }
  public changeLanguage() {
    this.departments = this.serverGetterService
      .get<Departments[]>(`${urls.api.prod.departments}?_lang=${this.currentLang}&_eduType=2`)
      .map(res => res.data)
      .catch(err => Observable.of([]));
  }

  ngOnDestroy() {
    this.localeSubscription.unsubscribe();
  }
}
