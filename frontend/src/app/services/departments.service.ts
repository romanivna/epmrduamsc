import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/of';
import { TeachersService } from './teachers.service';
import { ApiResponse } from './ApiResponse';
import { urls } from 'app/shared/constants';
import { Teacher, Department } from 'app/declarations';
import { Departments } from '../declarations/department';

@Injectable()
export class DepartmentsService {

  constructor(private http: Http, private teachersService: TeachersService) { }

  public get departments() {
    return this.http
    .get('/api/v1/departments/')
    .map(res => res.json() as ApiResponse<Department>);
  }

  public departmentsWithTeachers(idDeparement, lang) {
      const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });

      return this.http
        .get(`${urls.api.prod.departments}?_lang=${lang}`, {
          headers
        })
        .switchMap(res => {
          const [department] = (res.json() as ApiResponse<Department>).data;
          const allDepartments = (res.json() as ApiResponse<Department>).data;
          const isDepartmentWithIdInCurrentLanguage = allDepartments.some(function( obj ) {
            return +obj.id === idDeparement;
          });
          if (!isDepartmentWithIdInCurrentLanguage) {
            idDeparement = 0;
          }
          let teachers$;
          if (idDeparement && idDeparement !== 0) {
            teachers$ = this.teachersService
              .getTeachersByDepartmentId(idDeparement, lang);

          } else {
            teachers$ = this.teachersService
              .getTeachersByDepartmentId(department.id, lang);
          }
          return Observable.zip(
            Observable.of(res.json() as ApiResponse<Department>),
            teachers$
          );
        })
        .map(data => ({ departments: data[0], teachers: this.sortHeadTeachers(data[1])}));
  }

  public sortHeadTeachers(teachers) {
    const headId = teachers['department'].head_id;
    let headIndex;
    if (teachers['data'].length > 0 && headId !== 'null') {
      headIndex = teachers['data'].findIndex(function( obj ) {
        return obj.id === headId;
      });
      if (headIndex === -1) {
       this.http
         .get(`${urls.api.prod.teachers}/${headId}`)
         .subscribe(res => {
           const head = (res.json() as ApiResponse<Teacher>).data;
           teachers['data'].unshift(head);
           teachers['data'][0].isHead = true;
         });

     } else {
       teachers['data'][headIndex].isHead = true;
       const a = teachers['data'].splice(headIndex, 1);
       teachers['data'].unshift(a[0]);
     }
    }
    return teachers;
  }


}
