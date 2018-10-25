import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ECalendarValue, IDatePickerDirectiveConfig } from 'ng2-date-picker';
import { LocalizatorService } from '../../../../shared/services/localizator';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss']
})
export class DateFieldComponent implements OnInit, OnDestroy {
  @Input() public id: number;
  @Input() public field: any;
  @Input() public form: FormGroup;
  @Input() public minDateLimit: number;
  @Input() public maxDateLimit: number;
  public changeLanguage = true;
  public datePickerConfig: IDatePickerDirectiveConfig;
  private localeObservable: Subscription;


  constructor(private localizatorService: LocalizatorService) {
  }

  public refreshComponent() {
    this.changeLanguage = false;
    setTimeout(() => {
      this.changeLanguage = true;
    });
  }

  private uaLangMapping(langId): string {
    return langId === 'ua' ? 'uk' : langId;
  }

  private setDateLimit(limitYear) {
    const dateNow = new Date();
    return dateNow.getFullYear() + limitYear;
  }


  ngOnInit() {
    this.datePickerConfig = {
      locale: this.uaLangMapping(this.localizatorService.currentLang()),
      firstDayOfWeek: 'mo',
      showMultipleYearsNavigation: true,
      format: 'DD.MM.YYYY',
      min: '01.01.' + this.setDateLimit(this.minDateLimit),
      max: '01.01.' + this.setDateLimit(this.maxDateLimit),
      showTwentyFourHours: true,
      returnedValueType: ECalendarValue.Moment
    };
    this.localeObservable = this.localizatorService.currentLocaleObservable().subscribe((lang) => {
      this.datePickerConfig.locale = this.uaLangMapping(lang);
      this.refreshComponent();
    });
  }

  ngOnDestroy() {
    this.localeObservable.unsubscribe();
  }
}
