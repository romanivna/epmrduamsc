import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';

import { ServerGetterService, LocalizatorService } from './../../../../shared/services';

import { Education } from 'app/declarations';
import { urls, configurations } from './../../../../shared/constants';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-education-preview',
  templateUrl: './education-preview.component.html',
  styleUrls: ['./education-preview.component.scss']
})
export class EducationPreviewComponent implements OnInit, OnDestroy {
  public extended = false;
  public education: Education[] = [];
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
      .get<Education[]>(`${urls.api.prod.education}?_lang=${this.currentLang}`)
      .subscribe(data => {
        this.education = data.data;
      });
  }
  private getEducation(): void {
    this.serverGetterService
      .get<Education[]>(`${urls.api.prod.education}?_lang=${this.currentLang}`)
      .subscribe({
        next: this.applyLoadedEducation.bind(this),
      });
  }

  private applyLoadedEducation(res: any): void {
    this.education = this.education.concat(res.data);
    console.log(this.education);
  }
}
