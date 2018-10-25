import {
  Component,
  OnInit,
  ElementRef,
  EventEmitter,
  ViewChild, OnDestroy
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerGetterService, EditorInsertImageService, LocalizatorService } from '../../../../shared/services';
import { urls } from './../../../../shared/constants';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Education } from '../../../../declarations/index';
import { ContentPreparatorService } from '../../../mscommon-module/services';
import { ckEditorConfig } from '../../../../shared/constants/index';
import { DragAndDropService } from '../../../../shared/services/drag-and-drop/drag-and-drop.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-education-editing',
  templateUrl: './education-editing.component.html',
  styleUrls: ['./education-editing.component.scss']
})
export class EducationEditingComponent implements OnInit, OnDestroy {

  public educationForm = new FormGroup({
    description: new FormControl()
  });
  public education: any = {
    description: [],
    id: 0,
    img: {
      id: '',
      link: '',
      title: ''
    },
  };
  public questionForConfirmation: any;
  public questionToUpdate: boolean;
  public imgSelection = false;
  private dirty: EventEmitter<string> = new EventEmitter();
  public errMessage: string;
  private url = urls.api.prod.images;
  public content: string;
  public ckEditorConfig = ckEditorConfig;
  private newsImgBeforeUpdate: number;
  private param: any;
  private isUpdate: boolean;
  public savePressed = false;
  public errorMessages = {
    required: 'This field is required.',
    minLength: 'Value in this field needs to be more than 2 symbols.'
  };
  public currentLang: string;
  private localeSubscription = [];
  private isClickOutside: boolean;
  private routeGo = new Subject<boolean>();


  constructor(private serverGetterService: ServerGetterService,
              private editorInsertImageService: EditorInsertImageService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private elementRef: ElementRef,
              private contentPreparator: ContentPreparatorService,
              private fb: FormBuilder,
              public DnD: DragAndDropService,
              private localizatorService: LocalizatorService) { }

  ngOnInit() {
    this.localeSubscription.push(this.localizatorService.currentLocaleObservable().subscribe(data => {
      this.currentLang = data;
    }));
    this.localeSubscription.push(this.activatedRoute.params.subscribe(params => {
      this.param = +params['id'];
      this.isUpdate = Boolean(this.param);
    }));
    if (this.isUpdate) {
      this.loadData();
    }
    this.dirty.subscribe((msg) => {
      this.errMessage = msg;
    });
    this.editorInsertImageService.upload();
  }

  public loadData(): void {
    this.localeSubscription.push(this.activatedRoute.params
      .switchMap(({ id }) => this.serverGetterService.get(`${ urls.api.prod.education }/${ id }`))
      .subscribe(
        ({ data }) => {
          this.education = <Education>data;
          this.newsImgBeforeUpdate = this.education.img;
          this.educationForm.controls.description.setValue( this.education.description );
        },

        console.error // notify user, send err to backend, etc
      ));
    this.localeSubscription.push(this.dirty.subscribe((msg) => {
      this.errMessage = msg;
    }));
  }

  public updateImg(data: any): void {
    this.imgSelection = false;
    this.education.img = data;
  }

  public addImage(event: any): void {
    this.DnD.addImage(event, this.education, this.imgSelection);
  }

  public suggestToSave(): void {
    this.savePressed = true;
    if (!this.isValid()) {
      return;
    }
    this.questionForConfirmation = {
      text: 'confirmationQuestionSaveEducation'
    };
    this.questionToUpdate = true;
  }

  public suggestToCancel(): void {
    this.questionForConfirmation = {
      text: 'confirmationQuestionCancel'
    };
    this.questionToUpdate = false;
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
    return !this.educationForm.value.description  && !this.education.description
      || this.educationForm.value.description === this.education.description;

  }

  private reactOnQuestion(answer) {
    if (this.questionToUpdate && answer) {
      this.save();
    }else if (answer && !this.isClickOutside) {
      this.router.navigate([ '/admin/education' ]);
    } else if (answer && this.isClickOutside) {
      return this.routeGo.next(true);
    } else if (!answer && this.isClickOutside ) {
      return this.routeGo.next(false);
    }

  }

  public showAlbums(): void {
    this.imgSelection = true;
  }

  public decideAboutVoting(answer: boolean): void {
    this.questionForConfirmation = null;
    this.reactOnQuestion(answer);
  }
  private save(): void {
    this.education.description = this.educationForm.controls.description.value;
    this.education.constructor = '';
    this.sendToServer();
  }
  public sendToServer(): void {
    let observer;
    observer = this.serverGetterService.update(`${urls.api.prod.education}/${this.education.id}`, this.education);
    observer.subscribe(
      () => {
        this.router.navigate([ 'admin/education' ]);
      },
      err => console.error
    );
  }
  public doScroll() {
    if (!this.education.img) {
      window.scrollTo(0, 0);
    } else if (!this.educationForm.valid) {
      const [firstInvalidControl, ] = Object.keys(this.educationForm.controls)
        .filter(control => {
          const field = this.educationForm.get(control);
          if ((field as FormControl).invalid) {
            return control;
          }
        });
      const scrollMargin = 50;
      window.scrollTo(0, document.getElementById(firstInvalidControl).getBoundingClientRect().top + window.scrollY - scrollMargin);
    }
  }

  public isValid(): boolean {
    const isValidContent = !!this.educationForm.controls.description.value;
    this.doScroll();
    return this.educationForm.valid && this.education.img.link && isValidContent;
  }

  ngOnDestroy() {
    this.localeSubscription.forEach(item => item.unsubscribe());
  }

}
