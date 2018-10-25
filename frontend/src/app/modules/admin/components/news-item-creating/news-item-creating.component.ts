import {
  Component,
  OnInit,
  ElementRef,
  EventEmitter, OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerGetterService, EditorInsertImageService } from '../../../../shared/services';
import { urls } from './../../../../shared/constants';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NewsItem } from '../../../../declarations/index';
import { ContentPreparatorService } from '../../../mscommon-module/services';
import { ckEditorConfig } from '../../../../shared/constants/index';
import { DragAndDropService } from '../../../../shared/services/drag-and-drop/drag-and-drop.service';
import { Subject } from 'rxjs/Subject';
import { GaleryNotificationsService } from '../../../../services/galery-notifications.service';

@Component({
  selector: 'app-news-item-creating',
  templateUrl: 'news-item-creating.template.html',
  styleUrls: ['news-item-creating.styles.scss']
})
export class NewsItemCreatingComponent implements OnInit, OnDestroy {

  public newsItemForm = new FormGroup({
    title: new FormControl(),
    content: new FormControl(),
    isRussian: new FormControl(),
    isUkrainian: new FormControl(),
    isEnglish: new FormControl()
  });

  public newsItem: any = {
    content: [],
    id: 0,
    url: '',
    lang: [],
    img: {
      id: '',
      link: '',
      title: ''
    }
  };
  public questionForConfirmation: any;
  public questionToUpdate: boolean;
  public imgSelection = false;
  private dirty: EventEmitter<string> = new EventEmitter();
  public errMessage: string;
  public content: string;
  public ckEditorConfig = ckEditorConfig;
  private param: any;
  private isUpdate: boolean;
  public savePressed = false;
  public errorMessages = {
    required: 'This field is required.',
    minLength: 'Value in this field needs to be more than 2 symbols.'
  };
  private routeGo = new Subject<boolean>();
  private isClickOutside: boolean;
  private galleryClose: any = true;
  private subscriptions = [];

  constructor(private serverGetterService: ServerGetterService,
              private editorInsertImageService: EditorInsertImageService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private elementRef: ElementRef,
              public DnD: DragAndDropService,
              public galleryNotification: GaleryNotificationsService) { }

  ngOnInit() {
    this.galleryNotification.notificationsStream.subscribe(data => {
      this.galleryClose =  data === 'open';
    });
    this.subscriptions.push(this.activatedRoute.params.subscribe(params => {
      this.param = +params['id'];
      this.isUpdate = Boolean(this.param);
    }));
    if (this.isUpdate) {
      this.loadData();
    }
    this.subscriptions.push(this.dirty.subscribe((msg) => {
      this.errMessage = msg;
    }));
    this.editorInsertImageService.upload();

  }

  public loadData(): void {
    this.subscriptions.push(this.activatedRoute.params
    .switchMap(({ id }) => this.serverGetterService.get(`${ urls.api.prod.news }/${ id }`))
    .subscribe(
      ({ data }) => {
        this.newsItem = <NewsItem>data;
        const languages = this.newsItem.lang.map(el => el.name);
        this.newsItemForm.get('title').setValue(this.newsItem.header);
        if (languages.indexOf('uk') > -1) {
          this.newsItemForm.get('isUkrainian').setValue(true);
        }
        if (languages.indexOf('ru') > -1) {
          this.newsItemForm.get('isRussian').setValue(true);
        }
        if (languages.indexOf('en') > -1) {
          this.newsItemForm.get('isEnglish').setValue(true);
        }
        this.content = this.newsItem.content;
        this.newsItemForm.controls.content.setValue( this.newsItem.content );
      },

      console.error // notify user, send err to backend, etc
    ));
    this.subscriptions.push(this.dirty.subscribe((msg) => {
      this.errMessage = msg;
    }));
  }

  public updateImg(data: any): void {
    this.imgSelection = false;
    this.newsItem.img = data;
  }

  public addImage(event: any): void {
    this.DnD.addImage(event, this.newsItem, this.imgSelection);
  }

  public suggestToSave(): void {
    this.savePressed = true;
    if (!this.isValid()) {
      return;
    }
    this.questionForConfirmation = {
      text: 'confirmationQuestionSaveNews'
    };
    this.questionToUpdate = true;
  }

  public suggestToCancel(): void {
    this.questionForConfirmation = {
      text: 'confirmationQuestionCancel'
    };
    this.questionToUpdate = false;
  }

  public showAlbums(): void {
    this.imgSelection = true;
  }

  public canDeactivate() {
    if (this.savePressed) {
      return true;
    }
    if (this.changeDetection()) {
      return true;
    } else {
      this.suggestToCancel();
      this.isClickOutside = true;
      return this.routeGo.asObservable();
    }
  }

  public changeDetection() {
    const content = !this.newsItemForm.value.content  && !this.newsItem.content[0]
      || this.newsItemForm.value.content === this.newsItem.content;
    const header = !this.newsItemForm.value.title && !this.newsItem.header
      || this.newsItemForm.value.title === this.newsItem.header;
    return content && header;
  }

  public decideAboutVoting(answer: boolean): void {
    this.questionForConfirmation = null;
    this.reactOnQuestion(answer);
  }

  private reactOnQuestion(answer) {
    if (this.questionToUpdate && answer) {
      this.save();
    }else if (answer && !this.isClickOutside) {
      this.router.navigate([ '/admin/news' ]);
    } else if (answer && this.isClickOutside) {
      return this.routeGo.next(true);
    } else if (!answer && this.isClickOutside) {
      return this.routeGo.next(false);
    }

      }

  private save(): void {
    this.newsItem.header = this.elementRef
      .nativeElement
      .querySelector('.content-box__header')
      .value
      .trim();
    this.newsItem.lang = [];
    if (this.newsItemForm.value.isRussian) {
      this.newsItem.lang.push('ru');
    }
    if (this.newsItemForm.value.isUkrainian) {
      this.newsItem.lang.push('uk');
    }
    if (this.newsItemForm.value.isEnglish) {
      this.newsItem.lang.push('en');
    }
    this.newsItem.content = this.newsItemForm.value.content;
    this.newsItem.constructor = '';
    this.newsItem.date = +(new Date());
    this.sendToServer();
  }

  public sendToServer(): void {
    let observer;
    if (this.isUpdate) {
      this.newsItem.content = this.newsItemForm.controls.content.value;
      observer = this.serverGetterService.update(`${urls.api.prod.news}/${this.newsItem.id}`, this.newsItem);
    } else {
      observer = this.serverGetterService.post(urls.api.prod.news, this.newsItem, {});
    }
    observer.subscribe(
      () => {
        this.router.navigate([ 'admin/news' ]);
      },
      err => console.error
    );
  }

  public doScroll() {
    if (!this.newsItem.img) {
      window.scrollTo(0, 0);
    } else if (!this.newsItemForm.valid) {
      const [firstInvalidControl, ] = Object.keys(this.newsItemForm.controls)
      .filter(control => {
        const field = this.newsItemForm.get(control);
        if ((field as FormControl).invalid) {
          return control;
        }
      });
      const scrollMargin = 50;
      window.scrollTo(0, document.getElementById(firstInvalidControl).getBoundingClientRect().top + window.scrollY - scrollMargin);
    }
  }

  public isValid(): boolean {
    const isValidContent = !!this.newsItemForm.controls.content.value;
    const isCheckedLanguage = !(!this.newsItemForm.value.isUkrainian
    && !this.newsItemForm.value.isRussian && !this.newsItemForm.value.isEnglish);
    this.doScroll();
    return this.newsItemForm.valid && this.newsItem.img.link && isValidContent && isCheckedLanguage;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
