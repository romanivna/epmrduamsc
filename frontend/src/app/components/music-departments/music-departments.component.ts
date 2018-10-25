import {Component, OnDestroy, OnInit, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Education } from 'app/declarations';
import { ServerGetterService, LocalizatorService } from '../../shared/services';
import { MusicDepartmentsItemPreview } from './declarations/music-departments-item-preview.model';
import { urls, configurations } from './../../shared/constants';

@Component({
  selector: 'app-music-departments',
  templateUrl: 'music-departments.template.html',
  styleUrls: ['music-departments.styles.scss']
})
export class MusicDepartmentsComponent implements OnInit, OnDestroy {
  public selectedImg: string;
  public education: Education[] = [];
  public currentLang: string;
  private localeSubscription: Subscription;
  public pageTitle: string;

  constructor(private serverGetterService: ServerGetterService,
              private localizatorService: LocalizatorService) { }

  ngOnInit() {
    this.localeSubscription = this.localizatorService.currentLocaleObservable().subscribe(data => {
      this.currentLang = data;
      this.changeLanguage();
    });
  }

  ngOnDestroy() {
    this.localeSubscription.unsubscribe();
  }

  public onImageClick(e: Event): void {
    this.selectedImg = (e.target as Element).getAttribute('data-url');
  }

  public changeLanguage() {
    this.serverGetterService
      .get<Education[]>(`${urls.api.prod.education}?_lang=${this.currentLang}&_eduType=2`)
      .subscribe({
        next: (data) => {
          this.education = data.data;
        },
        error: (error) => {
          console.error(error);
        }
    });
  }
}

