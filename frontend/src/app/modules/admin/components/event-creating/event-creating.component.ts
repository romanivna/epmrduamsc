import { Component, Input, OnInit, AfterContentInit, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsContentPreviewItem } from '../../../mscommon-module/components/events-content-preview/declarations';
import { ServerGetterService, EditorInsertImageService } from '../../../../shared/services/';
import { urls } from '../../../../shared/constants/index';
import { ContentPreparatorService } from '../../../mscommon-module/services';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ckEditorConfig } from '../../../../shared/constants/index';
import { IDatePickerConfig, ECalendarValue } from 'ng2-date-picker';
import 'rxjs/add/operator/switchMap';
import * as moment from 'moment';
import { DragAndDropService } from '../../../../shared/services/';
import { LocalizatorService } from '../../../../shared/services/localizator';
import {Subscription, ReplaySubject, Subject} from 'rxjs/Rx';
import { GaleryNotificationsService } from '../../../../services/galery-notifications.service';

@Component({
  selector: 'app-event-creating',
  templateUrl: 'event-creating.template.html',
  styleUrls: ['event-creating.styles.scss']
})

export class EventCreatingComponent implements OnInit, OnDestroy, AfterContentInit {
  public event: EventsContentPreviewItem = {
    id: 0,
    lang: [],
    header: '',
    title: '',
    date: [],
    img: {
      id: '',
      link: '',
      title: '',
    },
    description: '',
    place: {
      name: '',
      link: '',
      address: ''
    }
  };
  public questionForConfirmation: any;
  public questionForLeaving: any;
  public questionToSave: boolean;
  public imgSelection = false;
  public maxDate: string;
  public minDate: string;
  public readonly dateFormat = 'DD.MM.YYYY HH:mm';
  public savePressed = false;
  private isUpdate;
  public errMessage;
  public ckEditorConfig = ckEditorConfig;
  public datePickerConfig: IDatePickerConfig = {};
  public eventForm: FormGroup = this.fb.group({
    dateFrom: ['', Validators.required],
    dateTo: ['', Validators.required],
    header: ['', Validators.required],
    title: ['', Validators.required],
    placeName: [''],
    placeAddress: ['', Validators.required],
    placeLink: [''],
    content: [''],
    isRussian: [''],
    isUkrainian: [''],
    isEnglish: ['']
  });

  private localSubscribe = [];
  private routeGo = new Subject<boolean>();
  private isClickOutside: boolean;
  private galleryClose: any = true;

  constructor(private serverGetter: ServerGetterService,
    private editorInsertImageService: EditorInsertImageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef,
    private contentPreparator: ContentPreparatorService,
    private fb: FormBuilder,
    public DnD: DragAndDropService,
    private localizator: LocalizatorService,
    private changeDetector: ChangeDetectorRef,
    public galleryNotification: GaleryNotificationsService
) { }
  ngOnInit() {

   this.galleryNotification.notificationsStream.subscribe(data => {
     this.galleryClose = data === 'open';
    });
    this.localSubscribe.push(this.activatedRoute.params.subscribe(params => {
      this.isUpdate = Boolean(+params['id']);
    }));
    this.editorInsertImageService.upload();
    this.localSubscribe.push(this.localizator.currentLocaleObservable().subscribe(ln => {
      this.setDatePickerConfig(ln);
      this.setDateLimits();
      this.changeDetector.detectChanges();
    }));
  }

  ngOnDestroy() {
    try {
      this.localSubscribe.forEach(item => item.unsubscribe());
      this.changeDetector.detach();
    } catch (error) {}
  }

  setDatePickerConfig(lang: string): void {
    this.datePickerConfig = {
      firstDayOfWeek: 'mo',
      showMultipleYearsNavigation: true,
      format: this.dateFormat,
      min: this.minDate,
      max: this.maxDate,
      returnedValueType: ECalendarValue.Moment,
      showTwentyFourHours: true,
      locale: moment.locale(lang)
    };
  }

  ngAfterContentInit() {
    if (this.isUpdate) {
      this.loadData();
    }
    return this.routeGo.asObservable();
  }

  public setDateLimits(): void {
    this.maxDate = moment().add(2, 'years').toISOString();
    this.maxDate = moment(this.maxDate).format(this.dateFormat);
    this.minDate = moment().subtract(1, 'years').toISOString();
    this.minDate = moment(this.minDate).format(this.dateFormat);
  }

  public loadData(): void {
    if (this.isUpdate) {
      this.activatedRoute.params
        .switchMap(({ id }) => this.serverGetter.get(`${urls.api.prod.events}/${id}`))
        .subscribe(
          ({ data }) => {
            this.event = <EventsContentPreviewItem>data;
            const languages = this.event.lang.map(el => el.name);
            this.setFormValues(this.event);
            if (languages.includes('uk')) {
              this.eventForm.get('isUkrainian').setValue(true);
            }
            if (languages.includes('ru')) {
              this.eventForm.get('isRussian').setValue(true);
            }
            if (languages.includes('en')) {
              this.eventForm.get('isEnglish').setValue(true);
            }
          },
      );
    }
  }

  public setFormValues(event): void {
    this.eventForm.setValue({
      title: event.title,
      header: event.header,
      isUkrainian: false,
      isRussian: false,
      isEnglish: false,
      dateFrom: moment(event.date[0].toString(), 'x').format(this.dateFormat),
      dateTo: moment(event.date[1].toString(), 'x').format(this.dateFormat),
      placeName: event.place.name,
      placeAddress: event.place.address,
      placeLink: event.place.link,
      content: this.event.description
    });
  }

  public updateImg(data: any): void {
    console.log(data);
    this.imgSelection = false;
    this.event.img = data;
  }

  public addImage(event: any): void {
    this.DnD.addImage(event, this.event, this.imgSelection);
  }

  public suggestToSave(): void {
    this.savePressed = true;
    if (!this.isValid()) {
      return;
    }
    this.questionForConfirmation = {
      text: 'confirmationQuestionSaveEvent'
    };
    this.questionToSave = true;
  }

  public suggestToCancel(): void {
    this.questionForConfirmation = {
      text: 'confirmationQuestionCancel'
    };
    this.questionToSave = false;
  }

  public showAlbums(): void {
    this.imgSelection = true;
  }

  canDeactivate() {
    if (this.changeDetection()) {
      return true;
    } else {
      this.suggestToCancel();
      this.isClickOutside = true;
      return this.routeGo.asObservable();
    }
    }

  public changeDetection() {
    let dateFrom;
    if (this.eventForm.value.dateFrom === undefined) {
      dateFrom = (this.event.date[0] === this.eventForm.value.dateFrom);
    } else if (this.event.date[0]) {
      dateFrom = (moment(this.eventForm.get('dateFrom').value.valueOf().toString(), 'x').format(this.dateFormat)
      === moment(this.event.date[0].toString(), 'x').format(this.dateFormat));
    }
    let dateTo;
    if (this.eventForm.value.dateTo === undefined) {
      dateTo = (this.event.date[1] === this.eventForm.value.dateTo);
    } else if (this.event.date[1]) {
      dateTo = (moment(this.eventForm.get('dateTo').value.valueOf().toString(), 'x').format(this.dateFormat)
      === moment(this.event.date[1].toString(), 'x').format(this.dateFormat));
    }
    const description = !this.eventForm.value.content && !this.event.description
      || this.eventForm.value.content === this.event.description;
    const header = !this.eventForm.value.header && !this.event.header === undefined
      || this.eventForm.value.header === this.event.header;
    const placeName = !this.eventForm.value.placeName && !this.event.place.name
      || this.eventForm.value.placeName === this.event.place.name;
    const placeAddress = !this.eventForm.value.placeAddress && !this.event.place.address === undefined
      || this.eventForm.value.placeAddress === this.event.place.address;
    const placeLink = !this.eventForm.value.placeLink && !this.event.place.link === undefined
      || this.eventForm.value.placeLink === this.event.place.link;
    const title = !this.eventForm.value.title && !this.event.title === undefined
      || this.eventForm.value.title === this.event.title;
    const langs = (((+this.eventForm.value.isRussian) + (+this.eventForm.value.isUkrainian) +
    (+this.eventForm.value.isEnglish)) === this.event.lang.length);
    return dateFrom && dateTo && description && header && placeName && placeAddress && placeLink && title && langs;
  }

  public decideAboutVoting(answer: boolean): any {
    this.questionForConfirmation = null;
    if (this.questionToSave && answer) {
      this.save();
    } else if (answer && !this.isClickOutside) {
      this.router.navigate(['/admin/events']);
    } else if (answer && this.isClickOutside) {
      return this.routeGo.next(true);
    } else if (!answer && this.isClickOutside) {
      return this.routeGo.next(false);
    }
    this.isClickOutside = false;
  }

  public save(): void {
    this.event.lang = [];
    if (this.eventForm.get('isRussian').value) {
      this.event.lang.push('ru');
    }
    if (this.eventForm.get('isUkrainian').value) {
      this.event.lang.push('uk');
    }
    if (this.eventForm.get('isEnglish').value) {
      this.event.lang.push('en');
    };
    this.event.header = this.eventForm.get('header').value;
    this.event.title = this.eventForm.get('title').value;
    this.event.date = [];
    this.event.description = this.eventForm.controls.content.value;
    this.event.date[0] = this.eventForm.get('dateFrom').value.valueOf();
    this.event.date[1] = this.eventForm.get('dateTo').value.valueOf();
    this.event.place = {
      name: '',
      link: '',
      address: ''
    };
    this.event.place.address = this.eventForm.get('placeAddress').value;
    this.event.place.link = this.eventForm.get('placeLink').value;
    this.event.place.name = this.eventForm.get('placeName').value;
    this.sendToServer();
  }

  public sendToServer(): void {
    this.event.description = this.eventForm.controls.content.value;
    this.prepareContent();
    let observer;
    if (this.isUpdate) {
      observer = this.serverGetter.update(`${urls.api.prod.events}`, this.event);
    } else {
      observer = this.serverGetter.post(urls.api.prod.events, this.event, {});
    }
    observer.subscribe(() => {
      this.router.navigate(['admin/events']);
    }, err => console.error);
  }

  private prepareContent(): void {
    this.event.description = this.contentPreparator.changeImgSources(this.event.description);
    this.event.description = this.contentPreparator.removeImgTools(this.event.description);
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.eventForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }


  public doScroll() {
    if (!this.event.img.link) {
      window.scrollTo(0, 0);
    } else if (!this.eventForm.valid) {
      const [firstInvalidControl, ] = Object.keys(this.eventForm.controls)
        .filter(control => {
          const field = this.eventForm.get(control);
          if ((field as FormControl).invalid) {
            return control;
          }
        });
      const scrollMargin = 50;
      window.scrollTo(0, document.getElementById(firstInvalidControl).getBoundingClientRect().top + window.scrollY - scrollMargin);
    }
  }

  public isEndBeforeStart(): boolean {
    if (this.eventForm.get('dateTo').value && this.eventForm.get('dateFrom').value) {
      return moment(this.eventForm.get('dateTo').value).isBefore(moment(this.eventForm.get('dateFrom').value));
    } else {
      return false;
    }
  }

  public isEventFromPast(): boolean {
    if (this.eventForm.get('dateFrom').value) {
      return moment(this.eventForm.get('dateFrom').value).isBefore(moment());
    } else {
      return false;
    }
  }

  public isValid(): boolean {
    const dateFromControl = this.eventForm.get('dateFrom');
    const dateToControl = this.eventForm.get('dateTo');
    if (dateFromControl.value > dateToControl.value) {
      dateToControl.setErrors({ 'dateError': true });
      dateFromControl.setErrors({ 'dateError': true });
    } else if (dateToControl.errors && dateToControl.errors['dateError']) {
      dateToControl.setErrors(null);
    } else if (dateFromControl.errors && dateFromControl.errors['dateError']) {
      dateFromControl.setErrors(null);
    }
    const isValidContent = !!this.eventForm.controls.content.value;
    const isCheckedLanguage = this.eventForm.value.isUkrainian || this.eventForm.value.isRussian || this.eventForm.value.isEnglish;
    const isValidAll = this.eventForm.valid && this.event.img.link && isValidContent && isCheckedLanguage;
    this.doScroll();
    return isValidAll;
  }
}
