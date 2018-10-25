import { Component, OnInit, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Education } from 'app/declarations';
import { ServerGetterService, LocalizatorService } from '../../shared/services';
import { urls } from '../../shared/constants';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-general-education-page',
  templateUrl: 'general-education.template.html',
  styleUrls: ['general-education.styles.scss']
})
export class GeneralEducationComponent implements OnInit, OnDestroy {
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
      .get<Education[]>(`${urls.api.prod.education}?_lang=${this.currentLang}&_eduType=1`)
      .subscribe(data => {
        this.education = data.data;
      });
  }
}
