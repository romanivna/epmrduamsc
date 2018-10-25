import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerGetterService } from './../../../shared/services';
import { urls } from './../../../shared/constants';
import { Ensemble } from './../../../declarations';
import { Observable } from 'rxjs/Observable';
import { NewsItem } from 'app/declarations';
import { LocalizatorService } from '../../../shared/services/localizator';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-ensemble-item',
  templateUrl: './ensemble-item.component.html',
  styleUrls: ['./ensemble-item.component.scss']
})
export class EnsembleItemComponent implements OnInit, OnDestroy {
  public ensembles: Ensemble[] = [];
  public currentLang: string;
  private subscription;
  private ensembleNameMaxLength = 25;
  constructor(private serverGetterService: ServerGetterService,
              private localizatorService: LocalizatorService) {
  }

  ngOnInit() {
    this.subscription = this.localizatorService.currentLocaleObservable().subscribe(data => {
      this.currentLang = data;
      this.changeLanguage();
    });
  }

  public changeLanguage() {
    this.serverGetterService
      .get<Ensemble[]>(`${urls.api.prod.ensembles}?_lang=${this.currentLang}`)
      .subscribe(data => {
        this.ensembles = data.data;
        this.ensembles.map( item => {
          if (item.name.length > this.ensembleNameMaxLength) {
            return item.name = item.name.slice(0, this.ensembleNameMaxLength) + ' ...' ;
          };
        });
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
