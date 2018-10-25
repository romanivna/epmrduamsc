import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';

import { Teacher, Teachers } from 'app/declarations';
import { ServerGetterService } from '../../shared/services/server-getter/server-getter.service';
import { BreadcrumbsService } from '../../components/breadcrumbs/breadcrumbs.service';

import { urls } from '../../shared/constants';

import 'rxjs/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import { LocalizatorService } from '../../shared/services/localizator/localizator.service';

@Component({
  selector: 'app-teacher',
  templateUrl: 'teacher.template.html',
  styleUrls: [ 'teacher.styles.scss' ]
})
export class TeacherComponent implements OnInit, DoCheck, OnDestroy {
  public teacher: Teacher;
  public id: number;
  public count: number;
  public selectedImg: string;
  public cachedTeachers: Teachers = [];
  public currentLang: string;
  public subscription = [];
  private previousTeacher: boolean;
  private nextTeacher: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private breadcrumbsService: BreadcrumbsService,
              private serverGettterService: ServerGetterService,
              private localizatorService: LocalizatorService
              ) { }

  ngOnInit(): void {
    this.nextTeacher = true;
    this.previousTeacher = true;
    this.subscription.push(this.localizatorService.currentLocaleObservable().subscribe(lang => {
      if (this.currentLang !== lang && this.currentLang) {
        this.router.navigate([ 'our-teachers/all' ]);
      }
      this.currentLang = lang;
      this.serverGettterService.get<Teachers>(`${urls.api.prod.teachers}?_lang=${this.currentLang}`)
        .flatMap(({ data }) => {
          this.cachedTeachers = data;
          return this.route.params;
        })
        .subscribe((params: Params) => {
          this.id = +params['breadcrumb'];
          this.teacher = this.findTeacher(this.id);
          this.nextTeacher = this.previousTeacher = this.cachedTeachers.length > 1;
        });
    }));
  }


    ngDoCheck(): void {
      if (this.cachedTeachers.length > 0) {
      this.breadcrumbsService.setBreadcrumbToItemName(this.name);
    }
  }

  public getNextTeacher(): void {
    this.id = +this.cachedTeachers[this.getNextTeacherIndex()].id;
    this.router.navigate(['/our-teachers/teacher', this.id]);
  }

  private getNextTeacherIndex(): number {
    if (!this.cachedTeachers) {
      return null;
    }
    let index: number = this.getTeacherIndex();
    index = (index < this.cachedTeachers.length - 1) ? ++index : 0;
    return index;
  }

  public getPreviousTeacher() {
    this.id = +this.cachedTeachers[this.getPreviousTeacherIndex()].id;
    this.router.navigate(['/our-teachers/teacher', this.id]);
  }

  private getPreviousTeacherIndex(): number {
    if (!this.cachedTeachers) {
      return null;
    }
    let index: number = this.getTeacherIndex();
    index = (index > 0) ? --index : this.cachedTeachers.length - 1;
    return index;
  }

  public getNextTeacherName(): string {
    if (!this.cachedTeachers) {
      return null;
    }
    const _teacher = this.cachedTeachers[this.getNextTeacherIndex()];
    return `${ _teacher.firstName } ${ _teacher.lastName }`;
  }

  public getPreviousTeacherName(): string {
    if (!this.cachedTeachers) {
      return null;
    }
    const _teacher = this.cachedTeachers[this.getPreviousTeacherIndex()];
    return `${ _teacher.firstName } ${ _teacher.lastName }`;
  }

  public onImageClick(e: any) {
    const src: string = e.target.getAttribute('src');
    this.selectedImg = src;
  }

  private findTeacher(_id): Teacher {
    const tchs = this.cachedTeachers.filter(({ id }) => +id === +_id);
    return (tchs.length > 0) ? tchs[0] : null;
  }


  private getTeacherIndex(): number {
    if (!this.cachedTeachers) {
      return null;
    }
    return this.cachedTeachers.indexOf(this.teacher);
  }

  public get name() {
      return this.teacher.firstName + ' ' + this.teacher.lastName;
  }

  ngOnDestroy() {
    this.subscription.forEach(item => item.unsubscribe());
    this.nextTeacher = false;
    this.previousTeacher = false;
  }

}
