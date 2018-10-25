import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServerGetterService, LocalizatorService } from '../../../../../shared/services';
import { Departments, Teachers, Teacher } from '../../../../../declarations';
import { urls, configurations } from '../../../../../shared/constants';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { PartialObserver } from 'rxjs/Observer';


@Component({
  selector: 'app-teacher-management',
  templateUrl: './teacher-management.component.html',
  styleUrls: ['./teacher-management.component.scss']
})
export class TeacherManagementComponent implements OnInit, OnDestroy {
  public departments: Array<object>;
  public teachers: Array<object>;
  private currentLang: string;
  public error: string;
  private teacherForDeleteId: any;
  private confirmQuestion: any;
  private deleteObserver: PartialObserver<any>;
  private localeSubscription: Subscription;
  private currentDepartment: any;
  private noDep = false;
  private ifAllTeachers = true;

  public showTeachersFrom = 0;
  public allTeachersLoaded: boolean;

  constructor(
              public serverGetterService: ServerGetterService,
              private localizatorService: LocalizatorService) {
    this.deleteObserver = {
      next: this.applyDeleting.bind(this),
      error: this.applyError.bind(this, 'delete-error')
    };
   }

  ngOnInit() {
    this.teachers = [];
    this.confirmQuestion = null;
    this.localeSubscription =  this.localizatorService.currentLocaleObservable().subscribe(data => {
      this.currentLang = data;
      this.currentDepartment = 'all';
      this.getDepartments();
    });
  }

  ngOnDestroy() {
    this.teachers = null;
    this.localeSubscription.unsubscribe();
  }

  getAllTeachers() {
    const limit = configurations.teachersPreview.loadItemsPerRequest;
    this.allTeachersLoaded = false;
    if (this.showTeachersFrom === 0) {
      this.teachers = [];
    }

    this.serverGetterService
    .get<Teachers>(`${urls.api.prod.teachers}?_limit=${limit}&_start=${this.showTeachersFrom}&_lang=${this.currentLang}`)
    .subscribe({
      next: res => {
        this.applyLoadedTeachers(res.data);
      },
      error: console.error
    });
  }

  applyLoadedTeachers(teachers: any) {
    this.teachers = this.teachers.concat(teachers);
    this.isAllTeachersLoaded(teachers);
  }

  isAllTeachersLoaded(teachers) {
    if (teachers.length < configurations.teachersPreview.loadItemsPerRequest) {
      this.allTeachersLoaded = true;
    }
  }

  public onNextTeachersItemsClick() {
    this.showTeachersFrom += configurations.teachersPreview.loadItemsPerRequest;
    if (this.ifAllTeachers) {
      this.getAllTeachers();
    } else {
      this.getTeachers(this.currentDepartment);
    }
  }

  getDepartments() {
    this.serverGetterService
    .get<Departments>(`${urls.api.prod.departments}?_lang=${this.currentLang}`)
    .subscribe({
      next: res => {
        this.departments = res.data;
        if (this.ifAllTeachers) {
          this.getAllTeachers();
        } else {
          this.getTeachers(this.currentDepartment);
        }
      },
      error: console.error
    });
  }

  getTeachers(department) {
    this.teachers = [];
    this.allTeachersLoaded = true;
    this.showTeachersFrom = 0;
    if (department !== 'noDep') {
      this.serverGetterService
      .get<Teachers>(`${urls.api.prod.departments}/${department.id}/teachers?_lang=${this.currentLang}`)
      .subscribe({
        next: res => {
          this.teachers = res.data;
        },
        error: console.error
      });
    } else {
      // TAKE TEACHERS WITHOUT DEPARTMENTS
      this.serverGetterService
      .get<Teachers>(`${urls.api.prod.departments}/0/teachers?_lang=${this.currentLang}`)
      .subscribe({
        next: res => {
          this.teachers = res.data;
        },
        error: console.error
      });
    }
  }

  currentDepartmentSelected() {
    if (this.currentDepartment === 'all') {
      this.ifAllTeachers = true;
      this.noDep = false;
      this.getAllTeachers();
      return;
    }
    this.ifAllTeachers = false;
    if (this.currentDepartment === 'noDep') {
        this.noDep = true;
    }
    this.getTeachers(this.currentDepartment);
  }

  private applyError(error: string): void {
    this.error = error;
  }

  private applyDeleting(): void {
    this.getDepartments();
  }

  public deleteTeacher(e: any, teacher: Teacher): void {
    this.showTeachersFrom = 0;
    this.teacherForDeleteId = teacher.id;
    this.confirmQuestion = {
      text: 'Delete teacher',
      itemHeader: ` ${teacher.firstName} ${teacher.lastName}`,
      itemName: '?'
    };
    e.stopPropagation();
    e.preventDefault();
  }

  public voteForDeleting(answer: boolean): void {
    this.confirmQuestion = null;
    if (answer) {
      this.serverGetterService.delete(`${urls.api.prod.teachers}/${this.teacherForDeleteId}`).subscribe(this.deleteObserver);
    }
    this.teacherForDeleteId = '';
  }
}
