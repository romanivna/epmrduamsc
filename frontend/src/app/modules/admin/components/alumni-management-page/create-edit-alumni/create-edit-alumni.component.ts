import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs/Rx';
import { FormGroup, FormBuilder, Validators, ControlValueAccessor } from '@angular/forms';
import { Alumni, IAlumni, Alumnies, EditedAlumni } from '../../../../../declarations/alumni';
import { LocalizatorService } from '../../../../../shared/services/localizator/localizator.service';
import { ServerGetterService } from '../../../../../shared/services/server-getter/server-getter.service';
import { EditorInsertImageService } from '../../../../../shared/services/editor-insert-image/editor-insert-image.service';
import { ckEditorConfig, urls } from '../../../../../shared/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { DragAndDropService } from '../../../../../shared/services/drag-and-drop/drag-and-drop.service';

@Component({
  selector: 'app-create-edit-alumni',
  templateUrl: './create-edit-alumni.component.html',
  styleUrls: ['./create-edit-alumni.component.scss']
})
export class CreateEditAlumniComponent implements OnInit, OnDestroy {

  private sub;
  private localeSubscription: Subscription;
  private currentLang: string;
  private alumniNeedToEditId: any;
  public alumniForm: FormGroup;
  public isEdited: boolean;
  public editedAlumni: EditedAlumni = {
    gradeYear: '',
    id: '',
    img: {
      link: '',
      title: '',
      id: '',
    },
    uk: {
      name: '',
      about: '',
    },
    ru: {
      name: '',
      about: '',
    },
    en: {
      name: '',
      about: '',
    },
  };
  private routeGo = new Subject<boolean>();
  private isClickOutside: boolean;
  public selectedCounter: number;

  public alumni: any = {
    gradeYear: '',
    img: {
      link: '',
      title: '',
      id: '',
    },
    id: '',
    en: {
      name: '',
      about: '',
    },
    ru: {
      name: '',
      about: '',
    },
    uk: {
      name: '',
      about: '',
    },
  };

  public currentImg: any= {
    img: ''
  };
  public questionForConfirmation: any;
  public photoSelection = false;
  private dirty: EventEmitter<string> = new EventEmitter();
  public errMessage: string;
  public content: string;
  public ckEditorConfig = ckEditorConfig;
  private param: any;
  public savePressed = false;
  private showLangIs: string;
  private errorUk: boolean;
  private errorEn: boolean;
  private errorRu: boolean;
  private errorGradeYear: boolean;
  private alumnies: Alumnies = [];
  private date = new Date();

  private departmentsArray: any[] = [];
  private noDep = true;

  constructor(private localizatorService: LocalizatorService,
              private serverGetterService: ServerGetterService,
              private editorInsertImageService: EditorInsertImageService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              public DnD: DragAndDropService) {
    this.createForm();
  }

  createForm() {

    this.alumniForm = this.fb.group({
      gradeYear: ['', [
        Validators.pattern(/^[0-9]*$/),
        Validators.min(1934),
        Validators.max(this.date.getFullYear())
      ]],
      name_en: ['', [
        Validators.required,
        Validators.pattern(/[A-Za-zA-Яа-я\u0430-\u044fіІєЄїЇёЁ]+/),
        Validators.minLength(2),
        Validators.maxLength(50),
      ]],
      about_en: '',
      name_ru: ['', [
        Validators.required,
        Validators.pattern(/[A-Za-zA-Яа-я\u0430-\u044fіІєЄїЇёЁ]+/),
        Validators.minLength(2),
        Validators.maxLength(50),
      ]],
      about_ru: '',
      name_uk: ['', [
        Validators.required,
        Validators.pattern(/[A-Za-zA-Яа-я\u0430-\u044fіІєЄїЇёЁ]+/),
        Validators.minLength(2),
        Validators.maxLength(50),
      ]],
      about_uk: ''
    });
  }

  rebuildForm() {
    this.alumniForm.reset({
      gradeYear: ['', [
        Validators.pattern(/^[0-9]*$/),
        Validators.min(1934),
        Validators.max(this.date.getFullYear())
      ]],
      name_en: ['', [
        Validators.required,
        Validators.pattern(/[A-Za-zA-Яа-я\u0430-\u044fіІєЄїЇёЁ]+/),
        Validators.minLength(2),
        Validators.maxLength(50),
      ]],
      about_en: '',
      name_ru: ['', [
        Validators.required,
        Validators.pattern(/[A-Za-zA-Яа-я\u0430-\u044fіІєЄїЇёЁ]+/),
        Validators.minLength(2),
        Validators.maxLength(50),
      ]],
      about_ru: '',
      name_uk: ['', [
        Validators.required,
        Validators.pattern(/[A-Za-zA-Яа-я\u0430-\u044fіІєЄїЇёЁ]+/),
        Validators.minLength(2),
        Validators.maxLength(50),
      ]],
      about_uk: ''
    });
  }

  ngOnInit() {
    this.showLangIs = 'uk';
    this.sub = this.activatedRoute.params.subscribe(data => {
      this.isEdited = Boolean(+data['id']);
      this.alumniNeedToEditId = data['id'];
      if (this.isEdited) {
        this.loadEditedTeacher(this.alumniNeedToEditId);
      }
    });
  }

  private showLang(_lang) {
    if ( this.showLangIs === _lang) {
      this.showLangIs = '';
    } else {
      this.showLangIs = _lang;
    };
  }
  ngOnDestroy() {
    // this.localeSubscription.unsubscribe();
    this.sub.unsubscribe();
  }

  loadEditedTeacher(id: any) {
    this.serverGetterService.get<Alumni>(`${urls.api.prod.alumniUpdate}/${id}`).subscribe({
      next: res => {
        this.fillTeacherEditedForm(res.data);
      },
      error: console.error
    });
  }

  fillTeacherEditedForm(editedAlumni) {
    const arrayOfAlumnusLangs = editedAlumni;
    this.currentImg.img = arrayOfAlumnusLangs[0].img;
    this.editedAlumni.id = arrayOfAlumnusLangs[0].id;
    this.editedAlumni.gradeYear = arrayOfAlumnusLangs[0].gradeYear;
    this.editedAlumni.uk = arrayOfAlumnusLangs.filter(item => item.lang.name === 'uk')[0];
    this.editedAlumni.en = arrayOfAlumnusLangs.filter(item => item.lang.name === 'en')[0];
    this.editedAlumni.ru = arrayOfAlumnusLangs.filter(item => item.lang.name === 'ru')[0];
    this.alumniForm.setValue({
      gradeYear: this.editedAlumni.gradeYear,
      name_uk: this.editedAlumni.uk.name,
      about_uk: this.editedAlumni.uk.about,
      name_ru: this.editedAlumni.ru.name,
      about_ru: this.editedAlumni.ru.about,
      name_en: this.editedAlumni.en.name,
      about_en: this.editedAlumni.en.about,
  });
  }
  public updateImg(data: any): void {
    this.photoSelection = false;
    this.currentImg.img = data;
  }

  public addImage(event: any): void {
    this.currentImg.img = this.alumniForm.value.img;
    this.DnD.addImage(event, this.currentImg, this.photoSelection);
  }


  public suggestToSave(): void {
    if (this.alumniForm.status === 'VALID') {
      this.savePressed = true;
      this.questionForConfirmation = {
        text: 'confirmationQuestionSaveAlumni'
      };
    } else {
      this.savePressed = false;
      this.errorUk = !this.alumniForm.controls.name_uk.valid;
      this.errorEn = !this.alumniForm.controls.name_en.valid;
      this.errorRu = !this.alumniForm.controls.name_ru.valid;
      this.errorGradeYear = !this.alumniForm.controls.gradeYear.valid;
    }
  }

  public suggestToCancel(): void {
    this.questionForConfirmation = {
      text: 'confirmationQuestionCancel'
    };
    this.savePressed = false;
  }

  public showAlbums(): void {
    this.photoSelection = true;
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
    if (!this.isEdited) {
      return !Object.keys(this.alumniForm.controls).some( value => {
        return this.alumniForm.controls[value].dirty;
      });
    } else {
      return !Object.keys(this.alumniForm.controls).some( value => {
        return this.alumniForm.controls[value].touched;
      });
    }
  }

  public decideAboutVoting(answer: boolean): void {
    this.questionForConfirmation = null;
    this.reactOnQuestion(answer);
  }

  private reactOnQuestion(answer) {
    if (this.savePressed && answer) {
      this.save();
    } else if (this.savePressed && !answer) {
      this.savePressed = false;
    } else if (answer && !this.isClickOutside) {
      this.router.navigate([ '/admin/alumni-management' ]);
    } else if (answer && this.isClickOutside) {
      return this.routeGo.next(true);
    } else if (!answer && this.isClickOutside) {
      return this.routeGo.next(false);
    }
  }

  private save(): void {
    let _id;
    if (this.isEdited) {
      _id = +this.editedAlumni.id;
    } else {
      _id = '';
    }
    this.alumnies = <Alumnies>[
      {
        gradeYear: this.alumniForm.value.gradeYear,
        img: this.currentImg.img,
        id: _id,
        lang: 'uk',
        name: this.alumniForm.value.name_uk.trim(),
        about: this.alumniForm.value.about_uk.trim(),
  },
      {
        gradeYear: this.alumniForm.value.gradeYear,
        img: this.currentImg.img,
        id: _id,
        lang: 'ru',
        name: this.alumniForm.value.name_ru.trim(),
        about: this.alumniForm.value.about_ru.trim(),
  },
      {
        gradeYear: this.alumniForm.value.gradeYear,
        img: this.currentImg.img,
        id: _id,
        lang: 'en',
        name: this.alumniForm.value.name_en.trim(),
        about: this.alumniForm.value.about_en.trim(),
  },
    ];
    this.sendToServer(this.alumnies);
  }

  public sendToServer(alumnies): void {
    let observer;
    if (this.isEdited) {
      observer = this.serverGetterService.update(`${urls.api.prod.alumni}/${this.editedAlumni.id}`, alumnies);
    } else {
      observer = this.serverGetterService.post(urls.api.prod.alumni, alumnies, {});
    }

    observer.subscribe(
      () => {
        this.router.navigate([ 'admin/alumni-management' ]);
      },
      err => console.error
    );
  }

}
