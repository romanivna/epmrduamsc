import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

import { ServerGetterService } from '../../shared/services/server-getter/server-getter.service';
import { urls } from '../../shared/constants/index';
import { ICredentials, Credentials } from 'app/declarations';
import { googleMapsApiKey,
         googleMapsEnOptions,
         googleMapsRuOptions,
         googleMapsUkOptions} from '../../shared/constants/index';
import { LocalizatorService } from '../../shared/services/localizator';

@Component({
  selector: 'app-contacts-page',
  templateUrl: 'contacts.template.html',
  styleUrls: ['contacts.styles.scss']
})
export class ContactsComponent implements OnInit, OnDestroy {
  public contacts: Observable<ICredentials>;
  public mapsUrlParameters: SafeResourceUrl;
  private  gApiKey: string = googleMapsApiKey;
  private langSubs: Subscription;

  constructor(private serverGetterService: ServerGetterService,
              private localizatorService: LocalizatorService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.contacts = this.serverGetterService
      .get<ICredentials>(urls.api.mock.credentials)
      .map(credentials => ({ ...credentials.data }))
      .catch(err => Observable.of(new Credentials()));

      this.langSubs = this.localizatorService.currentLocaleObservable().subscribe(ln => {
          this.getMapsIframeParameters(ln);
      });
  }

  ngOnDestroy() {
    this.langSubs.unsubscribe();
  }

  getMapsIframeParameters(lang: string): void {
    let url: string;
    url = '/map?key=' + this.gApiKey;
    switch (lang) {
      case 'en':
        url += googleMapsEnOptions;
        break;
      case 'ru':
        url += googleMapsRuOptions;
        break;
      case 'ua':
        url += googleMapsUkOptions;
        break;
    }
    this.mapsUrlParameters = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
