import { Component, OnInit } from '@angular/core';

import { ServerGetterService } from '../../shared/services';
import { urls } from '../../shared/constants';
import { SchoolInfo } from './declarations';
import { LocalizatorService } from '../../shared/services/localizator';


@Component({
  selector: 'app-header',
  templateUrl: 'header.template.html',
  styleUrls: ['header.styles.scss']
})
export class HeaderComponent implements OnInit {

  public schoolInfo: SchoolInfo;
  public currentLang: string;
  public isAdmin: true;

  constructor(private serverGetterService: ServerGetterService, private localizatorService: LocalizatorService) { }

  ngOnInit() {
    this.getSchoolInfo();
  }

  private getSchoolInfo(): void {
    this.serverGetterService.get<SchoolInfo>(urls.api.mock.schoolInfo)
      .takeWhile(() => !this.schoolInfo)
      .subscribe(
        (resp) => this.schoolInfo = resp.data,
        (error) => console.error
      );
  }

  private getLangId() {
    return this.localizatorService.currentLang();
  }

}
