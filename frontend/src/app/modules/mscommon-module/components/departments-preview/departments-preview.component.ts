import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import { ElementRef } from '@angular/core';
import { ServerGetterService, LocalizatorService } from './../../../../shared/services';

import { Department } from 'app/declarations';
import { urls, configurations } from './../../../../shared/constants';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-departments-preview',
  templateUrl: './departments-preview.component.html',
  styleUrls: ['./departments-preview.component.scss']
})

export class DepartmentsPreviewComponent implements OnInit, OnDestroy {
  private showDepartmentsItemsFrom = 0;
  private removedDepartmentsItem: number;
  public extended = false;
  public department: Department[] = [];
  public questionForConfirmation: any = null;
  public currentLang: string;
  private localeSubscription: Subscription;
  public musicDepartments = [];
  public compulsoryDepartments = [];
  private fragmentSubscription: Subscription;
  public id: string;
  public isMusicDepartments = true;
  public isCompulsoryDepartments = true;
  constructor(private serverGetterService: ServerGetterService,
              private activatedRoute: ActivatedRoute,
              private localizatorService: LocalizatorService,
              private elementRef: ElementRef) {
    this.activatedRoute = activatedRoute;
    this.elementRef = elementRef;
    this.fragmentSubscription = null;
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot && this.activatedRoute.snapshot.data) {
      this.extended = this.activatedRoute.snapshot.data.extended;
    }
    this.localeSubscription = this.localizatorService.currentLocaleObservable().subscribe(data => {
      this.currentLang = data;
      this.changeLanguage();
    });
    this.fragmentSubscription = this.activatedRoute.fragment.subscribe(
      (fragment: string): void => {
        this.isMusicDepartments = true;
        this.isCompulsoryDepartments = true;
        if (fragment) {
          this.isMusicDepartments = (fragment === 'music-departments');
          this.isCompulsoryDepartments = !this.isMusicDepartments;
      }
    });
  }

  ngOnDestroy() {
    this.localeSubscription.unsubscribe();
    this.fragmentSubscription.unsubscribe();
  }

  public changeLanguage() {
    this.showDepartmentsItemsFrom = 0;
    this.serverGetterService
      .get<Department[]>(`${urls.api.prod.departments}?_lang=${this.currentLang}`)
      .subscribe(data => {
        this.department = data.data;
        this.musicDepartments = this.department.filter(item => item.educationType.toString() === '2');
        this.compulsoryDepartments = this.department.filter(item => item.educationType.toString() === '1');
      });
  }

  public suggestToRemove(id: number): void {
    this.removedDepartmentsItem = id;
    let index: number = -1;
    this.department.forEach((value: Department, i: number) => {
      index = (value.id === id) ? i : index;
    });
    this.questionForConfirmation = {
      text: 'confirmationQuestion',
      itemHeader: ` '${ this.department[index].name }' `,
      itemName: 'confirmationQuestionDepartment'
    };
  }

  public decideAboutRemoving(answer: boolean): void {
    this.questionForConfirmation = null;
    if (answer) {
      this.remove();
    } else {
      this.removedDepartmentsItem = null;
    }
  }

  private remove(): void {
    this.serverGetterService.delete(`${ urls.api.prod.departments }/${ this.removedDepartmentsItem }`)
      .subscribe(() => {
          this.showDepartmentsItemsFrom = 0;
          this.changeLanguage();
        },
        err => console.error
      );
  }
}
