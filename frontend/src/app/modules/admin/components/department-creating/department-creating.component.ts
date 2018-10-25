import {
  Component,
  OnInit,
  ElementRef,
  EventEmitter,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerGetterService, EditorInsertImageService, LocalizatorService } from '../../../../shared/services';
import { urls } from './../../../../shared/constants';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Department, Teacher, Education } from '../../../../declarations/index';
import { ContentPreparatorService } from '../../../mscommon-module/services';
import { ckEditorConfig } from '../../../../shared/constants/index';
import { DragAndDropService } from '../../../../shared/services/drag-and-drop/drag-and-drop.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-department-creating',
  templateUrl: './department-creating.component.html',
  styleUrls: ['./department-creating.component.scss']
})
export class DepartmentCreatingComponent implements OnInit {

  public departmentForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    head: new FormControl(),
    educationType: new FormControl()
  });
  public department: any = {
    name: '',
    description: [],
    id: 0,
    img: {
      id: '',
      link: '',
      title: ''
    },
    head_id: '',
    educationType: '',
    lang_Id: '',
    teachers: '',
  };
  public teachers: Teacher[] = [];
  public educations: Education[] = [];
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
  private educationType: string;
  private localeSubscription = [];
  private isClickOutside: boolean;
  private routeGo = new Subject<boolean>();
  private desctiprion: any;

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
    this.localeSubscription.push(this.dirty.subscribe((msg) => {
      this.errMessage = msg;
    }));
    this.editorInsertImageService.upload();
    this.getTeachers();
    this.getEducation();
  }

  public loadData(): void {
    this.localeSubscription.push(this.activatedRoute.params
      .switchMap(({ id }) => this.serverGetterService.get(`${ urls.api.prod.departments }/${ id }`))
      .subscribe(
        ({ data }) => {
          this.department = <Department>data;
          this.departmentForm.controls.title.setValue(this.department.name);
          this.departmentForm.controls.head.setValue( this.department.head_id);
          this.departmentForm.controls.educationType.setValue(this.department.educationType.toString());
          this.newsImgBeforeUpdate = this.department.img;
          this.departmentForm.controls.description.setValue( this.department.description );
        },

        console.error // notify user, send err to backend, etc
      ));
    this.localeSubscription.push(this.dirty.subscribe((msg) => {
      this.errMessage = msg;
    }));
  }

  public updateImg(data: any): void {
    this.imgSelection = false;
    this.department.img = data;
  }

  public addImage(event: any): void {
    this.DnD.addImage(event, this.department, this.imgSelection);
  }

  public suggestToSave(): void {
    this.savePressed = true;
    if (!this.isValid()) {
      return;
    }
    this.questionForConfirmation = {
      text: 'confirmationQuestionSaveDepartment'
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
    const eduType = !this.departmentForm.value.educationType  && !this.department.educationType.toString()
      || this.departmentForm.value.educationType === this.department.educationType.toString();
    const title = !this.departmentForm.value.title && !this.department.name
      || this.departmentForm.value.title === this.department.name;
    const head = !this.departmentForm.value.head && !this.department.head_id
      || this.departmentForm.value.head === this.department.head_id;
    const description = !this.departmentForm.value.description && !this.department.description
      || this.departmentForm.value.description === this.department.description;
    return eduType && title && head && description;
  }

  public decideAboutVoting(answer: boolean): void {
    this.questionForConfirmation = null;
    this.reactOnQuestion(answer);
  }

  private reactOnQuestion(answer) {
    if (this.questionToUpdate && answer) {
      this.save();
    }else if (answer && !this.isClickOutside) {
      this.router.navigate([ '/admin/departments' ]);
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
    this.department.name = this.departmentForm.controls.title.value;
    this.department.description = this.departmentForm.controls.description.value;
    this.department.head_id = this.departmentForm.controls.head.value;
    // this.department.constructor = '';
    this.educationType = this.departmentForm.controls.educationType.value;
    this.department.educationType = this.educationType;
    if (!this.department.lang_Id && !this.department.teachers) {
      this.department.lang_Id = null;
      this.department.teachers = null;
    }
    this.sendToServer();
  }
  public sendToServer(): void {
    let observer;
    if (this.isUpdate) {
      observer = this.serverGetterService
        .update(`${urls.api.prod.departments}/${this.department.id}?_eduType=${this.educationType}`, this.department);
    } else {
      observer = this.serverGetterService
        .post(`${urls.api.prod.departments}?_lang=${this.currentLang}&_eduType=${this.educationType}`, this.department, {});
    }
    observer.subscribe(
      () => {
        this.router.navigate([ 'admin/departments' ]);
      },
      err => console.error
    );
  }

  private getTeachers(): void {
    this.serverGetterService
      .get<Teacher[]>(`${urls.api.prod.teachers}?_lang=${this.currentLang}`)
      .subscribe({
        next: this.applyLoadedTeacher.bind(this),
      });
  }

  private getEducation(): void {
    this.serverGetterService
      .get<Education[]>(`${urls.api.prod.education}?_lang=${this.currentLang}`)
      .subscribe({
        next: this.applyLoadedEducation.bind(this),
      });
  }

  private applyLoadedTeacher(res: any): void {
    this.teachers = this.teachers.concat(res.data);
  }

  private applyLoadedEducation(res: any): void {
    this.educations = this.educations.concat(res.data);
  }
  public doScroll() {
    if (!this.department.img) {
      window.scrollTo(0, 0);
    } else if (!this.departmentForm.valid) {
      const [firstInvalidControl, ] = Object.keys(this.departmentForm.controls)
        .filter(control => {
          const field = this.departmentForm.get(control);
          if ((field as FormControl).invalid) {
            return control;
          }
        });
      const scrollMargin = 50;
      window.scrollTo(0, document.getElementById(firstInvalidControl).getBoundingClientRect().top + window.scrollY - scrollMargin);
    }
  }

  public isValid(): boolean {
    const isValidContent = !!this.departmentForm.controls.description.value;
    this.doScroll();
    return this.departmentForm.valid && this.department.img.link && isValidContent;
  }
}
