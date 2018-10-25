import { Component, OnInit } from '@angular/core';
import { LocalizatorService } from './../../../shared/services';

export const supportedLangs = [
  {
    lang: 'uk',
    title: 'укр'
  },
  {
    lang: 'en',
    title: 'eng'
  },
  {
    lang: 'ru',
    title: 'рус'
  }
];

@Component({
  selector: 'app-localization',
  templateUrl: 'localization.template.html',
  styleUrls: ['localization.styles.scss']
})
export class LocalizationComponent implements OnInit {
  public supportedLangs = supportedLangs;
  public currentLang: string;

  constructor(private localizatorService: LocalizatorService) {}

  ngOnInit() {
    this.selectLang(localStorage.getItem('currentLanguage') || 'uk');
  }

  selectLang(lang: string) {
    this.currentLang = supportedLangs.find( (item) => lang === item.lang ).title || 'укр';
    this.localizatorService.use(lang);
  }

}
