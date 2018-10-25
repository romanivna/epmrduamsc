import { Component, OnInit, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerGetterService, EditorInsertImageService, LocalizatorService } from '../../../../shared/services';
import { urls } from './../../../../shared/constants';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Ensemble } from '../../../../declarations/index';
import { ContentPreparatorService } from '../../../mscommon-module/services';
import { ckEditorConfig } from '../../../../shared/constants/index';
import { DragAndDropService } from '../../../../shared/services/drag-and-drop/drag-and-drop.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-ensembles-creating',
  templateUrl: './ensembles-creating.component.html',
  styleUrls: ['./ensembles-creating.component.scss']
})
export class EnsemblesCreatingComponent implements OnInit {

  public ensembleForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
  });
  public ensemble: any = {
    name: '',
    description: [],
    id: 0,
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
      if (data === 'ua') {
        this.currentLang = 'uk';
      } else {
        this.currentLang = data;
      }
    }));
    this.localeSubscription.push(this.activatedRoute.params.subscribe(params => {
      this.param = +params['id'];
      this.isUpdate = Boolean(this.param);
    }));
    if (this.isUpdate) {
      this.loadData();
    }
    this.localeSubscription.push(this.dirty.subscribe((msg) => {
      this.errMessage = msg;
    }));
    this.editorInsertImageService.upload();
  }

  public loadData(): void {
    this.localeSubscription.push(this.activatedRoute.params
      .switchMap(({ id }) => this.serverGetterService.get(`${ urls.api.prod.ensembles }/${ id }`))
      .subscribe(
        ({ data }) => {
          this.ensemble = <Ensemble>data;
          this.ensembleForm.controls.title.setValue(this.ensemble.name);
          this.newsImgBeforeUpdate = this.ensemble.img;
          this.ensembleForm.controls.description.setValue( this.ensemble.description );
        },

        console.error // notify user, send err to backend, etc
      ));
    this.localeSubscription.push(this.dirty.subscribe((msg) => {
      this.errMessage = msg;
    }));
  }

  public updateImg(data: any): void {
    this.imgSelection = false;
    this.ensemble.img = data;
  }

  public addImage(event: any): void {
    this.DnD.addImage(event, this.ensemble, this.imgSelection);
  }

  public suggestToSave(): void {
    this.savePressed = true;
    if (!this.isValid()) {
      return;
    }
    this.questionForConfirmation = {
      text: 'confirmationQuestionSaveEnsemble'
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
    const title = !this.ensembleForm.value.title && !this.ensemble.name
      || this.ensembleForm.value.title === this.ensemble.name;
    const description = !this.ensembleForm.value.description && !this.ensemble.description
      || this.ensembleForm.value.description === this.ensemble.description;
    return  title && description;
  }

  public decideAboutVoting(answer: boolean): void {
    this.questionForConfirmation = null;
    this.reactOnQuestion(answer);
  }

  private reactOnQuestion(answer) {
    if (this.questionToUpdate && answer) {
      this.save();
    }else if (answer && !this.isClickOutside) {
      this.router.navigate([ '/admin/ensembles' ]);
    } else if (answer && this.isClickOutside) {
      return this.routeGo.next(true);
    } else if (!answer && this.isClickOutside) {
      return this.routeGo.next(false);
    }

  }


  public showAlbums(): void {
    this.imgSelection = true;
  }


  private save(): void {
    this.ensemble.name = this.ensembleForm.controls.title.value;
    this.ensemble.description = this.ensembleForm.controls.description.value;
    this.ensemble.constructor = '';
    this.sendToServer();
  }
  public sendToServer(): void {
    let observer;
    if (this.isUpdate) {
      observer = this.serverGetterService
        .update(`${urls.api.prod.ensembles}/${this.ensemble.id}`, this.ensemble);
    } else {
      observer = this.serverGetterService
        .post(`${urls.api.prod.ensembles}?_lang=${this.currentLang}`, this.ensemble, {});
    }
    observer.subscribe(
      () => {
        this.router.navigate([ 'admin/ensembles' ]);
      },
      err => console.error
    );
  }
  public doScroll() {
    if (!this.ensemble.img) {
      window.scrollTo(0, 0);
    } else if (!this.ensembleForm.valid) {
      const [firstInvalidControl, ] = Object.keys(this.ensembleForm.controls)
        .filter(control => {
          const field = this.ensembleForm.get(control);
          if ((field as FormControl).invalid) {
            return control;
          }
        });
      const scrollMargin = 50;
      window.scrollTo(0, document.getElementById(firstInvalidControl).getBoundingClientRect().top + window.scrollY - scrollMargin);
    }
  }

  public isValid(): boolean {
    const isValidContent = !!this.ensembleForm.controls.description.value;
    this.doScroll();
    return this.ensembleForm.valid && this.ensemble.img.link && isValidContent;
  }
}
