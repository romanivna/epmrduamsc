import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeachersService } from '../../../services/';
import { Subscription} from 'rxjs/Subscription';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { urls, configurations } from './../../../shared/constants';
import { LocalizatorService, ServerGetterService } from '../../../shared/services/';
import { Item } from '../../../shared/declaration/index';

export interface TeacherItem extends Item {
  id: number;
  email: string;
  about: string;
  photo: {
    id: number,
    title: string,
    link: string
  };
  firstName: string;
  lastName: string;
  department: {
    id: number,
    name: string,
    description: string,
    img: {
      id: number,
      title: string,
      link: string
    },
    head_id: number
  };
  position: string;
}
@Component({
  selector: 'app-all-teachers-list',
  templateUrl: './all-teachers-list.component.html',
  styleUrls: ['./all-teachers-list.component.scss']
})
export class AllTeachersListComponent implements OnInit, OnDestroy {
  public teachers: TeacherItem[];
  public showTeachersFrom = 0;
  public currentLang: string;
  private localeSubscription: Subscription;
  private allTeachersLoaded: boolean;

  constructor(private localizatorService: LocalizatorService,
              private serverGetterService: ServerGetterService) { }

  ngOnInit() {
    this.teachers = [];
   this.localeSubscription = this.localizatorService.currentLocaleObservable().subscribe(data => {
     this.teachers = [];
      this.currentLang = data;
      this.getData();
    });
  }

  ngOnDestroy() {
    this.teachers = null;
    this.localeSubscription.unsubscribe();
  }

  private getData(): void {
    const start = this.showTeachersFrom;
    const limit = configurations.teachersPreview.loadItemsPerRequest;
    const lang = this.currentLang;
    this.allTeachersLoaded = false;
    this.serverGetterService
      .get(`${urls.api.prod.teachers}?_limit=${limit}&_start=${start}&_lang=${lang}`)
      .subscribe({
        next: this.applyLoadedTeachers.bind(this),
      });
  }

  private applyLoadedTeachers(res: any): void {
    this.teachers = this.teachers.concat(res.data);
    this.isAllTeachersLoaded(res.data);
  }

  private isAllTeachersLoaded(res): void {
    if (res.length < configurations.teachersPreview.loadItemsPerRequest) {
      this.allTeachersLoaded = true;
    }
  }

  public onNextTeachersItemsClick() {
    this.showTeachersFrom += configurations.teachersPreview.loadItemsPerRequest;
    this.getData();
  }

}
