import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { ApiResponse } from './ApiResponse';
import { Teacher } from 'app/declarations';
import {LocalizatorService} from '../shared/services/';

@Injectable()
export class TeachersService {
  public currentLanguage: string;

  constructor(private http: Http,
              private localizatorService: LocalizatorService) {
    this.localizatorService.currentLocaleObservable().subscribe(data => {
      this.currentLanguage = data;
    });
  }

  public getTeachers() {
    return this.http
      .get(`/api/v1/teachers?_lang=${this.currentLanguage}`)
      .map(res => res.json() as ApiResponse<Teacher>);
  }

  public getTeachersByDepartmentId(id: number, lang: string) {
    return this.http
      .get(`api/v1/departments/${id}/teachers?_lang=${lang}`)
      .map(res => res.json() as ApiResponse<Teacher>);
  }

}
