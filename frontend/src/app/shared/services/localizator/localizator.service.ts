import { Injectable } from '@angular/core';
import { ServerGetterService } from './../../../shared/services';
import { urls } from './../../../shared/constants';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LocalizatorService {

  private _currentLang: string;
  private _translations = {};
  private langUpdateSubj = new ReplaySubject<string>(1);

  constructor(private serverGetterService: ServerGetterService) {
  }

  public getTranslations() {
    this.serverGetterService
      .get<Object>(urls.api.mock.dictionary[this._currentLang])
      .subscribe({
        next: this.onLoadTranslations.bind(this),
        error: this.onLoadTranslationsError
      });
  }

  public getTranslationsByLang(_lang) {
    return this.serverGetterService
      .get(urls.api.mock.dictionary[_lang]);
  };

  public currentLang() {
    return this._currentLang;
  }

  private onLoadTranslations(res) {
    this._translations = res.data;
  }

  private onLoadTranslationsError(error) {
    console.log(error);
  }

  public use(lang: string): void {
    // set current language
    this._currentLang = lang;
    this.getTranslations();
    localStorage.setItem('currentLanguage', lang);
    this.langUpdateSubj.next(lang);
  }

  public currentLocaleObservable(): Observable<string> {
    return this.langUpdateSubj.asObservable();
  }

  public translate(key: string): string {
    // private perform translation
    const translation = key;

    if (this._translations[key]) {
      return this._translations[key];
    }

    return translation;
  }
}
