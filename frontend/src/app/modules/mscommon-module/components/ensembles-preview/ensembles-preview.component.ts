import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import { ServerGetterService, LocalizatorService } from './../../../../shared/services';
import { Ensemble } from 'app/declarations';
import { urls, configurations } from './../../../../shared/constants';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-ensembles-preview',
  templateUrl: './ensembles-preview.component.html',
  styleUrls: ['./ensembles-preview.component.scss']
})
export class EnsemblesPreviewComponent implements OnInit, OnDestroy {
  private removedEnsemble: number;
  public extended = false;
  public ensembles: Ensemble[] = [];
  public questionForConfirmation: any = null;
  public currentLang: string;
  private localeSubscription: Subscription;
  constructor(private serverGetterService: ServerGetterService,
              private activatedRoute: ActivatedRoute,
              private localizatorService: LocalizatorService) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot && this.activatedRoute.snapshot.data) {
      this.extended = this.activatedRoute.snapshot.data.extended;
    }
    this.localeSubscription = this.localizatorService.currentLocaleObservable().subscribe(data => {
      this.currentLang = data;
      this.changeLanguage();
    });
  }
  ngOnDestroy() {
    this.localeSubscription.unsubscribe();
  }

  public changeLanguage() {
    this.serverGetterService
      .get<Ensemble[]>(`${urls.api.prod.ensembles}?_lang=${this.currentLang}`)
      .subscribe(data => {
        this.ensembles = data.data;
      });

  }

  public suggestToRemove(id: number): void {
    this.removedEnsemble = id;
    let index: number = -1;
    this.ensembles.forEach((value: Ensemble, i: number) => {
      index = (value.id === id) ? i : index;
    });
    this.questionForConfirmation = {
      text: 'confirmationQuestion',
      itemHeader: ` '${ this.ensembles[index].name }' `,
      itemName: 'confirmationQuestionEnsemble'
    };
  }

  private getEnsembles(): void {
    this.serverGetterService
      .get<Ensemble[]>(`${urls.api.prod.ensembles}?_lang=${this.currentLang}`)
      .subscribe({
        next: this.applyLoadedEnsemble.bind(this),
      });
  }

  private applyLoadedEnsemble(res: any): void {
    this.ensembles = this.ensembles.concat(res.data);
  }

  public decideAboutRemoving(answer: boolean): void {
    this.questionForConfirmation = null;
    if (answer) {
      this.remove();
    } else {
      this.removedEnsemble = null;
    }
  }

  private remove(): void {
    this.serverGetterService.delete(`${ urls.api.prod.ensembles }/${ this.removedEnsemble }`)
      .subscribe(() => {
          this.ensembles = [];
          this.getEnsembles();
        },
        err => console.error
      );
  }

}
