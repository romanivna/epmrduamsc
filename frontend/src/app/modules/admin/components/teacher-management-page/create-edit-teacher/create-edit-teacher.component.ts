import {
  Component,
  OnInit,
  EventEmitter,
  ViewChild,
  OnDestroy} from '@angular/core';

  import { ActivatedRoute, Router } from '@angular/router';
  import { ServerGetterService, EditorInsertImageService, DragAndDropService, LocalizatorService } from '../../../../../shared/services';
  import { urls } from '../../../../../shared/constants';
  import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
  import { Departments, Teacher, Department } from '../../../../../declarations';
  import { ckEditorConfig } from '../../../../../shared/constants';
  import { Subscription } from 'rxjs/Subscription';
  import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-edit-teacher.component.html',
  styleUrls: ['./create-edit-teacher.component.scss']
})
export class CreateEditTeacherComponent implements OnInit, OnDestroy {
  private sub;
  private localeSubscription: Subscription;
  private currentLang: string;
  public teacherForm: FormGroup;
  private departments: any;
  private teacherNeedToEditId: any;
  public isEdited: boolean;
  public editedTeacher: Teacher;
  private routeGo = new Subject<boolean>();
  private isClickOutside: boolean;
  public selectedCounter: number;

  public teacher: any = {
    firstName: '',
    lastName: '',
    photo: '',
    department: [],
    lang: '',
    about: ''
  };

  public currentImg: any= {
    img: ''
  };
  public questionForConfirmation: any;
  public questionToUpdate: boolean;
  public photoSelection = false;
  private dirty: EventEmitter<string> = new EventEmitter();
  public errMessage: string;
  public content: string;
  public ckEditorConfig = ckEditorConfig;
  private param: any;
  public savePressed = false;

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
    this.teacherForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern('[A-Za-zA-Яа-я\u0430-\u044fіІєЄїЇёЁ]+')
    ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern('[A-Za-zA-Яа-я\u0430-\u044fіІєЄїЇёЁ]+')
      ]],
      position: '',
      about: '',
    });
  }

  rebuildForm() {
    this.teacherForm.reset({
      firstName: '',
      lastName: '',
      position: '',
      about: '',
    });
  }

  ngOnInit() {
    this.departmentsArray = [];
    this.selectedCounter = 0;
    this.sub = this.activatedRoute.params.subscribe(data => {
        this.isEdited = Boolean(+data['id']);
        this.teacherNeedToEditId = data['id'];
        if (this.isEdited) {
          this.loadEditedTeacher(this.teacherNeedToEditId);
        }
      });

    this.localeSubscription =  this.localizatorService.currentLocaleObservable().subscribe(data => {
      this.currentLang = data;
      this.teacher.lang = this.currentLang;
      this.rebuildForm();
      this.getDepartments();
    });
    this.editorInsertImageService.upload();
  }

  ngOnDestroy() {
    this.localeSubscription.unsubscribe();
    this.sub.unsubscribe();
  }

  departmentManagement(event, status: boolean) {
    if (event.value === 'noDep') {
      this.selectedCounter = 0;
      this.noDep = true;
      this.departmentsArray.forEach(departmentsItem => departmentsItem.checked = false);
    } else {
      this.noDep = false;
      this.departmentsArray.forEach(departmentsItem => {
        if (departmentsItem.id === +event.value) {
          status ? this.selectedCounter += 1 : this.selectedCounter -= 1;
          departmentsItem.checked = status;
        }
      });
      this.selectedCounter === 0 && this.noDep === false ? this.noDep = true : this.noDep = false;
    }
  }

  loadEditedTeacher(id: any) {
    this.serverGetterService.get<Teacher>(`${urls.api.prod.teachers}/${id}`).subscribe({
      next: res => {
        this.editedTeacher = res.data;
        this.currentImg.img = this.editedTeacher.photo;
        this.fillTeacherEditedForm(this.editedTeacher);
        this.selectedCounter = this.editedTeacher.department.length;
      },
      error: console.error
    });
  }

  fillTeacherEditedForm(editedTeacher) {
    this.teacherForm.setValue({
      firstName: editedTeacher.firstName,
      lastName: editedTeacher.lastName,
      position: editedTeacher.position,
      about: editedTeacher.about,
    });
  }

  getDepartments() {
    this.serverGetterService
    .get<Departments>(`${urls.api.prod.departments}?_lang=${this.currentLang}`)
    .subscribe({
      next: res => {
        this.departmentsArray = [];
        this.departments = res.data;
        this.departments.forEach(departmentsItem => {
          this.departmentsArray.push(
            {
              id: departmentsItem.id,
              name: departmentsItem.name,
              checked: false
            }
          );
        });
        if (this.isEdited) {
          if (this.editedTeacher.department.length > 0) {
            this.noDep = false;
            this.editedTeacher.department.forEach(teachersDepartment => {
              this.departmentsArray.forEach(department => {
                if  (teachersDepartment.id === department.id) {
                  department.checked = true;
                }
              });
            });
          } else {
            this.noDep = true;
          }
        }
      },
      error: console.error
    });
  }

  public updateImg(data: any): void {
    this.photoSelection = false;
    this.currentImg.img = data;
  }

  public addImage(event: any): void {
    this.currentImg.img = this.teacherForm.value.img;
    this.DnD.addImage(event, this.currentImg, this.photoSelection);
  }

  public suggestToSave(): void {
    this.savePressed = true;
    if (this.teacherForm.status === 'VALID') {
      this.questionToUpdate = true;
      this.questionForConfirmation = {
        text: 'confirmationQuestionSaveTeacher'
      };
    }
  }

  public suggestToCancel(): void {
    this.questionForConfirmation = {
      text: 'confirmationQuestionCancel'
    };
    this.questionToUpdate = false;
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
    let teacher = this.teacher;
    let departments;
    departments = !this.departmentsArray.some(value => value.checked);
    if (this.editedTeacher) {
      teacher = this.editedTeacher;
      departments = !this.departmentsArray
        .filter(value => {
          if (value.checked) {
            return value.id;
          }
        })
        .some((dep, i) => {
          return dep.id !== teacher.department[i].id;
        });
    }
    const position = !this.teacherForm.value.position  && !teacher.position
      || this.teacherForm.value.position === teacher.position;
    const firstName = !this.teacherForm.value.firstName && !teacher.firstName
      || this.teacherForm.value.firstName === teacher.firstName;
    const lastName = !this.teacherForm.value.lastName && !teacher.lastName
      || this.teacherForm.value.lastName === teacher.lastName;
    const about = !this.teacherForm.value.about && !teacher.about
      || this.teacherForm.value.about === teacher.about;

    return position && firstName && lastName && about && departments;
  }

  public decideAboutVoting(answer: boolean): void {
    this.questionForConfirmation = null;
    this.reactOnQuestion(answer);
  }

  private reactOnQuestion(answer) {
    if (this.questionToUpdate && answer) {
      this.save();
    }else if (answer && !this.isClickOutside) {
      this.router.navigate([ '/admin/teachers-management' ]);
    } else if (answer && this.isClickOutside) {
      return this.routeGo.next(true);
    } else if (!answer && this.isClickOutside) {
      return this.routeGo.next(false);
    }
  }

  private save(): void {
    this.teacher.department = this.departmentsArray.filter(item => item.checked).map(item => item.id);
    this.teacher.firstName = this.teacherForm.value.firstName.trim();
    this.teacher.lastName = this.teacherForm.value.lastName.trim();
    this.teacher.position = this.teacherForm.value.position.trim();
    this.teacher.about = this.teacherForm.value.about.trim();
    this.teacher.photo = this.currentImg.img;

    this.sendToServer(this.teacher);
  }

  public sendToServer(teacher): void {
    let observer;
    if (this.isEdited) {
      observer = this.serverGetterService.update(`${urls.api.prod.teachers}/${this.editedTeacher.id}`, teacher);
    } else {
      observer = this.serverGetterService.post(`${urls.api.prod.teachers}?_lang=${this.currentLang}`, teacher, {});
    }

    observer.subscribe(
      res => {
        res.errors ?
        console.log('smtg wrong you send to server')
        : this.router.navigate([ 'admin/teachers-management' ]);
      },
      err => console.error
    );
  }

}
