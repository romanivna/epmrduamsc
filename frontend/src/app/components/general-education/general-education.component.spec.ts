import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ConnectionBackend, RequestOptions, BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { GeneralEducationComponent } from './general-education.component';
import { ServerGetterService } from '../../shared/services/server-getter/server-getter.service';
import { SpinnerService, LocalizatorService } from '../../shared/services/';
import { DetectBrowserService } from '../../shared/services';
import { Observable } from 'rxjs/Observable';
import { TestScheduler } from 'rxjs/Rx';
import { SafeHtmlPipe } from '../../modules/mscommon-module/pipes';
import { LocalizatorPipe } from '../../shared/pipes';

const data = {
  description: 'mock',
  educationTypeId: 1,
  id: 3,
  img: {
    id: 2224,
    title: 'mockTitle',
    link: 'mockLink',
  },
  langId: null,
  title: 'Загальна середня освіта',
};

describe('GeneralEducationComponent', () => {
  let component: GeneralEducationComponent;
  let fixture: ComponentFixture<GeneralEducationComponent>;
  let serverGetterService: ServerGetterService;
  let localizatorService: LocalizatorService;
  // let mockService: any;
  // let mockStore: any;
  // let sut: any;
  // let scheduler: TestScheduler;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GeneralEducationComponent,
        SafeHtmlPipe,
        LocalizatorPipe,
      ],
      providers: [
        ServerGetterService,
        LocalizatorService,
        Http,
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        SpinnerService,
        DetectBrowserService
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serverGetterService = TestBed.get(ServerGetterService);
    localizatorService = TestBed.get(LocalizatorService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get content from server', () => {
    const spy = spyOn(serverGetterService, 'get').and.returnValue(Observable.create(observer => {
      observer.next({data: data});
    }));
    component.changeLanguage();
    expect(spy).toHaveBeenCalled();

    // scheduler = new TestScheduler( (a, b) => { expect(a).toEqual(b); } );
    // mockStore = scheduler.createHotObservable('--a-a-b-', {
    //   a: { data: { description: [ 'Mock text' ] } },
    //   b: { data: { description: [ 'Mock text 2'] } }
    // });
    // mockService = {
    //   get: () => {
    //     return mockStore;
    //   }
    // };
    // sut = new GeneralEducationComponent(mockService, mockService);
    // console.log(sut);

    // scheduler
    //   .expectObservable(sut.data)
    //   .toBe('--a-a-b-', {
    //     a: { description: [ 'Mock text' ] },
    //     b: { description: [ 'Mock text 2' ] }
    //   });
    // scheduler.flush();
  });

  it('should correctly choose a selected image', () => {
    const source = 'assets/img/news/preview/0.jpg';
    const event: any = {
      target: {
        'data-url': source,
        getAttribute(attr: string) {
          return this[attr];
        }
      }
    };
    component.onImageClick(event);
    expect(component.selectedImg).toEqual(source);
  });
});
