import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Subscription, Subject } from 'rxjs/Rx';
import { FormGroup, FormBuilder, Validators, ControlValueAccessor, FormArray, FormControl } from '@angular/forms';
import { LocalizatorService } from '../../../../../shared/services/localizator/localizator.service';
import { ServerGetterService } from '../../../../../shared/services/server-getter/server-getter.service';
import { EditorInsertImageService } from '../../../../../shared/services/editor-insert-image/editor-insert-image.service';
import { ckEditorConfig, urls } from '../../../../../shared/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { DragAndDropService } from '../../../../../shared/services/drag-and-drop/drag-and-drop.service';
import { Departments } from '../../../../../declarations/department';

@Component({
  selector: 'app-create-edit-laureate',
  templateUrl: 'create-edit-laureate.component.html',
  styleUrls: ['create-edit-laureate.component.scss']
})
export class CreateEditLaureateComponent implements OnInit, OnDestroy {
  private sub;
  private laureateNeedToEditId: any;
  private laureates: any;
  private competitions;
  private departments: Departments;
  private currentDepartment: any;
  public laureateForm: FormGroup;
  public isEdited: boolean;
  public editedLaureate: {
    id: '',
    name: '',
    teacher: '',
    department: {
      name: ''
    },
    competitions: [{title: ''}]
  };
  private routeGo = new Subject<boolean>();
  private isClickOutside: boolean;

  public laureate: any = {
    id: '',
    name: '',
    teacher: '',
    department: {
      name: ''
    },
    competitions: [{title: ''}]
  };

  public currentImg: any = {
    img: {
    }
  };
  public questionForConfirmation: any;
  public photoSelection = false;
  public errMessage: string;
  public content: string;
  public ckEditorConfig = ckEditorConfig;
  public savePressed = false;
  private errName = false;
  private errCompetition = false;

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
    this.laureateForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.pattern(/[A-Za-zA-Яа-я\u0430-\u044fіІєЄїЇёЁ]+/),
        Validators.minLength(2),
        Validators.maxLength(50),
      ]],
      teacher: ['', [
        Validators.pattern(/[A-Za-zA-Яа-я\u0430-\u044fіІєЄїЇёЁ]+/),
        Validators.minLength(2),
        Validators.maxLength(50),
      ]],
    });
  }

  rebuildForm() {
    this.laureateForm.reset({
      name: ['', [
        Validators.required,
        Validators.pattern(/[A-Za-zA-Яа-я\u0430-\u044fіІєЄїЇёЁ]+/),
        Validators.minLength(2),
        Validators.maxLength(50),
      ]],
      teacher: ['', [
        Validators.pattern(/[A-Za-zA-Яа-я\u0430-\u044fіІєЄїЇёЁ]+/),
        Validators.minLength(2),
        Validators.maxLength(50),
      ]],
    });
  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(data => {
      this.isEdited = Boolean(+data['id'] + 1); // if id started from 0
      // this.isEdited = Boolean(+data['id']);
      this.laureateNeedToEditId = data['id'];
      this.getDepartments();
    });
  }

  private getDepartments() {
    this.serverGetterService
      .get<Departments>(`${urls.api.prod.departments}?_lang=uk`)
      .subscribe({
        next: res => {
          this.departments = res.data;
          this.currentDepartment = this.departments[0];
          if (this.isEdited) {
            this.loadEditedLaureate(this.laureateNeedToEditId);
          }
        },
        error: console.error
      });
  }

  ngOnDestroy() {
    // this.localeSubscription.unsubscribe();
    this.sub.unsubscribe();
  }

  loadEditedLaureate(id: any) {
    this.serverGetterService.get(`${urls.api.prod.laureates}/${id}`).subscribe({
      next: res => {
        this.fillLaureateEditedForm(res.data);
      },
      error: console.error
    });
  }

  fillLaureateEditedForm(editedLaureate) {
    this.editedLaureate = editedLaureate;
    this.laureate.competitions = editedLaureate.competitions;
    this.currentDepartment = this.editedLaureate.department;
    this.currentImg = { img: editedLaureate.img };
    this.laureateForm.setValue({
      name: this.editedLaureate.name,
      teacher: this.editedLaureate.teacher,
    });
  }
  public updateImg(data: any): void {
    this.photoSelection = false;
    this.currentImg.img = data;
  }

  public addImage(event: any): void {
    this.currentImg.img = {};
    this.DnD.addImage(event, this.currentImg, this.photoSelection);
  }

  public suggestToSave(): void {
    this.savePressed = true;
    if (this.validForm()) {
      this.questionForConfirmation = {
        text: 'confirmationQuestionSaveLaureate'
      };
    } else {
      this.savePressed = false;
    }
  }

  private validForm() {
    let competitionsValues;
    competitionsValues = document.querySelectorAll('.input-competitions');
    competitionsValues = Array.from(competitionsValues).map(item => {
      return item['value'];
    });
    const competition = !(competitionsValues[0] === '');
    if (this.laureateForm.valid && competition) {
      return true;
    } else {
      if (this.laureateForm.invalid) {
        this.errName = true;
      }
      if (!competition) {
        this.errCompetition = true;
      }
      return false;
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
    const curDep = document.querySelector('.content-box__select-department')['value'];
    let competitionsValues;
    competitionsValues = document.querySelectorAll('.input-competitions');
    competitionsValues = Array.from(competitionsValues).map(item => {
      return item['value'];
    });
    if (!this.isEdited) {
      const competition = this.laureate.competitions.length === 1 && competitionsValues[0] === '';
      const department = (curDep === this.departments[0]['name']);
      return !Object.keys(this.laureateForm.controls).some( value => {
        return this.laureateForm.controls[value].dirty;
      }) && department && competition;
    } else {
      const competitions = !competitionsValues.some( (item, i) => {
        return item !== this.editedLaureate.competitions[i].title;
      });
      const department = (curDep === this.editedLaureate.department['name']);
      return !Object.keys(this.laureateForm.controls).some( value => {
        return this.laureateForm.controls[value].touched;
      }) && department && competitions;
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
      this.router.navigate([ '/admin/laureates-management' ]);
    } else if (answer && this.isClickOutside) {
      return this.routeGo.next(true);
    } else if (!answer && this.isClickOutside) {
      return this.routeGo.next(false);
    }
  }

  private save(): void {
    let _id;
    if (this.isEdited) {
      _id = +this.editedLaureate.id;
    } else {
      _id = 0;
    }
    let department;
    department = document.querySelector('.content-box__select-department')['value'];
    department = this.departments.filter(item => {
      return item.name === department;
    });
    let competitions;
    competitions = document.querySelectorAll('.input-competitions');
    competitions = Array.from(competitions).map(item => {
      return {
        id: 0,
        laureateId: _id,
        prize: '',
        title: item['value']
      };
    });
    if (!this.currentImg.img || !this.currentImg.img.link) {
      this.currentImg.img = {id: '', link: '', title: ''};
    }
    this.laureate = {
        img: this.currentImg.img,
        id: _id,
        name: this.laureateForm.value.name,
        teacher: this.laureateForm.value.teacher,
        department: department[0],
        competitions: competitions
      };
    this.sendToServer(this.laureate);
  }

  public sendToServer(laureate): void {
    let observer;
    if (this.isEdited) {
      observer = this.serverGetterService.update(`${urls.api.prod.laureates}/${this.editedLaureate.id}`, laureate);
    } else {
      observer = this.serverGetterService.post(urls.api.prod.laureates, laureate, {});
    }

    observer.subscribe(
      (data) => {
        this.router.navigate([ 'admin/laureates-management' ]);
      },
      err => console.error
    );
  }

  private addCompetition() {
    this.laureate.competitions.push({title: ''});
  }

  private deleteCompetition(_i) {
    this.laureate.competitions = [];
    let competitions;
    competitions = document.querySelectorAll('.input-competitions');
    competitions = Array.from(competitions).map(item => {
      return {title: item['value']};
    });
    competitions.splice(_i, 1);
    this.laureate.competitions = competitions;
  }

}
