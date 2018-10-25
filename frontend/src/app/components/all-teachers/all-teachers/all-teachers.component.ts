import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { Teacher, Teachers, Department, Departments } from '../../../declarations';
import { DepartmentsService } from '../../../services/departments.service';
import { BreadcrumbsService } from '../../breadcrumbs/breadcrumbs.service';

import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { urls } from '../../../shared/constants';
import { ApiResponse } from '../../../services/ApiResponse';
import { LocalizatorService } from '../../../shared/services/localizator/localizator.service';
import { ServerGetterService } from '../../../shared/services/server-getter/server-getter.service';


@Component({
  selector: 'app-all-teachers',
  templateUrl: 'all-teachers.component.html',
  styleUrls: ['all-teachers.component.scss']
})

export class AllTeachersComponent implements OnInit, OnDestroy {
  public data: Observable<any>;
  public headTeacher: Teacher;
  public nextDepartmentId;
  public previousDepartmentId;
  public currentDepartmentIndex;
  public subscription = [];
  public noTeachers: boolean;
  public currentLang: string;
  public departments: any;
  private departmentsShow: boolean;
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private departmentsService: DepartmentsService,
              private breadcrumbsService: BreadcrumbsService,
              private localizatorService: LocalizatorService,
              private serverGetterService: ServerGetterService) {
  }

  ngOnInit() {
    this.departmentsShow = false;
    this.subscription.push(this.localizatorService.currentLocaleObservable()
      .subscribe(data => {
      this.currentLang = data;
      this.data = null;
        this.subscription.push(this.activatedRoute.paramMap
          .switchMap((params: ParamMap) => this.getData(params, this.currentLang))
          .subscribe(
            res => {
              this.departments = res.departments.data;
              this.departments.map(item => {
                item.selected = item.id === res.teachers.department.id;
              });
              this.noTeachers = false;
              if (res.teachers['data'].length === 0) {
                this.noTeachers = true;
              }
              this.breadcrumbsService.setBreadcrumbToItemName(res.teachers.department.name);
              this.getNextDepartmentsIds(res['teachers']['department'], res['departments']['data']);
            }
          ));
    }));

  }

  public getData(params, lang) {
      return this.data = this.departmentsService.departmentsWithTeachers ( +params.params[ 'breadcrumb' ], lang);
  }

  public  currentDepartmentSelected(event) {
    const dep = this.departments.filter(value => {
      return value.name === event.target.value;
    });
    this.router.navigate([`our-teachers/all-teachers/${dep[0].id}`]);
  }

  public getNextDepartmentsIds(currentDepartment, departments) {
    this.currentDepartmentIndex = departments.findIndex(department => department.id === currentDepartment.id);
    let nextIndex: number;
    let previousIndex: number;
    if ( this.currentDepartmentIndex === departments.length - 1) {
      nextIndex = 0;
      previousIndex =  this.currentDepartmentIndex - 1;
    } else if ( this.currentDepartmentIndex === 0) {
      nextIndex =  this.currentDepartmentIndex + 1;
      previousIndex = departments.length - 1;
    } else {
      nextIndex =  this.currentDepartmentIndex + 1;
      previousIndex =  this.currentDepartmentIndex - 1;
    }

    if (!departments[nextIndex] || departments[nextIndex].id === currentDepartment.id) {
      this.nextDepartmentId = false;
    } else {
      this.nextDepartmentId = departments[nextIndex].id;
    }
    if (!departments[previousIndex] || departments[previousIndex].id === currentDepartment.id) {
      this.previousDepartmentId = false;
    } else {
      this.previousDepartmentId = departments[previousIndex].id;
    }
  }

  public getNextDepartment(): void {
    this.router.navigate([`our-teachers/all-teachers/${this.nextDepartmentId}`]);
  }

  public getPreviousDepartment(): void {
    this.router.navigate([`our-teachers/all-teachers/${this.previousDepartmentId}`]);
  }

  public showDepartments() {
    this.departmentsShow = !this.departmentsShow;
  }

  public goToDepartment(_id) {
    this.departmentsShow = false;
    this.router.navigate([`our-teachers/all-teachers/${_id}`]);
  }

  ngOnDestroy() {
    this.subscription.forEach(item => item.unsubscribe());
  }
}
