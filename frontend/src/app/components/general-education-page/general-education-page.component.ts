import { Component, OnInit } from '@angular/core';

import { ServerGetterService } from '../../shared/services';
import { urls } from '../../shared/constants';
import { EducationDivisionDescription, SchoolInfo } from './declarations';
import { MusicDepartmentsItemPreview } from '../music-departments/declarations/music-departments-item-preview.model';

@Component({
  selector: 'app-general-education-page',
  templateUrl: 'general-education-page.template.html',
  styleUrls: ['general-education-page.styles.scss']
})
export class GeneralEducationPageComponent implements OnInit {
  public elementaryDivision: EducationDivisionDescription;
  public musicalDivision: EducationDivisionDescription;
  public schoolInfo: SchoolInfo;
  public departments: MusicDepartmentsItemPreview[];


  constructor(private serverGetterService: ServerGetterService) { }

  ngOnInit() {
    this.getDivisions();
    this.getDirector();
    this.getDepartments();
  }

  private getDivisions(): void {
    this.serverGetterService
      .get<EducationDivisionDescription>(urls.api.mock.elementaryEducation)
      .takeWhile(() => !this.elementaryDivision)
      .subscribe(
      (content) => {
        this.elementaryDivision = content.data;
        if (!Array.isArray(this.elementaryDivision.description)) {
          this.elementaryDivision.description = [ this.elementaryDivision.description.toString() ];
        }
      },
      (error) => console.log
    );
    this.serverGetterService
      .get<EducationDivisionDescription>(urls.api.mock.musicalEducation)
      .takeWhile(() => !this.musicalDivision)
      .subscribe(
      (content) => {
        this.musicalDivision = content.data;
        if (!Array.isArray(this.musicalDivision.description)) {
          this.musicalDivision.description = [ this.musicalDivision.description.toString() ];
        }
      },
      (error) => console.log
    );

  }

  private getDirector(): void {
    this.serverGetterService
      .get<SchoolInfo>(urls.api.mock.schoolInfo)
      .takeWhile(() => !this.schoolInfo)
      .subscribe(
        (content) => this.schoolInfo = content.data,
        (error) => console.log
      );
  }

  private getDepartments(): void {
    this.serverGetterService
      .get<MusicDepartmentsItemPreview[]>(urls.api.prod.departments)
      .takeWhile(() => !this.departments)
      .subscribe(
        res => this.departments = res.data,
        error => console.log
      );
  }

}
