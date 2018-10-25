import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { TeacherComponent } from './teacher.component';
import { ActivatedRoute, Router, Params } from '@angular/router';

import {
  ConnectionBackend,
  RequestOptions,
  BaseRequestOptions,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ServerGetterService } from '../../shared/services/server-getter/server-getter.service';
import { RouteNormalizerPipe } from '../../modules/mscommon-module/pipes';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { SpinnerService } from '../../shared/services/spinner/spinner.service';
import { DetectBrowserService, LocalizatorService } from '../../shared/services';
import { ImageUrlCreatorPipe } from '../../modules/mscommon-module/pipes';
import { BreadcrumbsService } from '../breadcrumbs/breadcrumbs.service';
import { LocalizatorPipe } from '../../shared/pipes';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';

describe('TeacherComponent', () => {
  let component: TeacherComponent;
  let fixture: ComponentFixture<TeacherComponent>;

  let mockActivatedRoute: MockActivatedRoute;
  let mockRouter: MockRouter;
  let serverGetterService: ServerGetterService;
  let breadcrumbsService: BreadcrumbsService;

  class MockActivatedRoute extends ActivatedRoute {
    params: Observable<Params>;
    constructor(parameters?: { [key: string]: any; }) {
      super();
      this.params = Observable.of(parameters);
    }
  }

  class MockRouter {
    navigate = jasmine.createSpy('navigate');
  }

  const mockedTeachers = [
    {
      id: 0,
      firstName: 'mock1',
      lastName: 'mock1',
      position: 'head',
      about: 'mock',
      department: ['mock'],
      photo: {
        id: '0',
        link: '',
        title: ''
      },
      lang: 'mock',
    },
    {
      id: 1,
      firstName: 'mock1',
      lastName: 'mock1',
      position: 'head',
      about: 'mock',
      department: ['mock'],
      photo: {
        id: '0',
        link: '',
        title: ''
      },
      lang: 'mock',
    },
    {
      id: 2,
      firstName: 'mock1',
      lastName: 'mock1',
      position: 'head',
      about: 'mock',
      department: ['mock'],
      photo: {
        id: '0',
        link: '',
        title: ''
      },
      lang: 'mock',
    },
    {
      id: 3,
      firstName: 'mock1',
      lastName: 'mock1',
      position: 'head',
      about: 'mock',
      department: ['mock'],
      photo: {
        id: '0',
        link: '',
        title: ''
      },
      lang: 'mock',
    }
  ];

  beforeEach(async(() => {
    mockActivatedRoute = new MockActivatedRoute({ 'id': '1' });
    mockRouter = new MockRouter();

    TestBed.configureTestingModule({
      declarations: [
        TeacherComponent,
        RouteNormalizerPipe,
        ImageUrlCreatorPipe,
        LocalizatorPipe,
        SafeHtmlPipe,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        ServerGetterService,
        {provide: ConnectionBackend, useClass: MockBackend},
        {provide: ActivatedRoute,  useValue: mockActivatedRoute},
        {provide: RequestOptions, useClass: BaseRequestOptions},
        {provide: Router, useValue: mockRouter},
        Http,
        SpinnerService,
        DetectBrowserService,
        BreadcrumbsService,
        LocalizatorService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serverGetterService = TestBed.get(ServerGetterService);
    breadcrumbsService = TestBed.get(BreadcrumbsService);
    spyOn(serverGetterService, 'get').and.returnValue(Observable.create((observer) => {
      observer.next({ data: mockedTeachers });
    }));
    spyOn(breadcrumbsService, 'setBreadcrumbToItemName');
  });

  it('should create', () => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      component.cachedTeachers = mockedTeachers;
      component.id = 0;
      component.teacher = mockedTeachers[0];
      expect(component).toBeTruthy();
    });
  });

  it('should get teachers from server', () => {
    component.ngOnInit();
    component.cachedTeachers = mockedTeachers;
    fixture.whenStable().then(() => {
      expect(component.cachedTeachers.length).toBeGreaterThan(0);
    });
  });

  it('should get next teacher', () => {
    component.cachedTeachers = mockedTeachers;
    component.teacher = mockedTeachers[0];
    component.id = +component.teacher.id;
    component.getNextTeacher();
    expect(component.id === 1).toBeTruthy();
  });

  it('should get next teacher even if it is last teacher', () => {
    component.cachedTeachers = mockedTeachers;
    component.teacher = mockedTeachers[3];
    component.id = +component.teacher.id;
    component.getNextTeacher();
    expect(component.id === 0).toBeTruthy();
  });

  it('should get previous teacher', () => {
    component.cachedTeachers = mockedTeachers;
    component.teacher = mockedTeachers[1];
    component.id = +component.teacher.id;
    component.getPreviousTeacher();
    expect(component.id === 0).toBeTruthy();
  });

  it('should get previous teacher even if it is first teacher', () => {
    component.cachedTeachers = mockedTeachers;
    component.teacher = mockedTeachers[0];
    component.id = +component.teacher.id;
    component.getPreviousTeacher();
    expect(component.id === 3).toBeTruthy();
  });

  it('should get previous teacher index', () => {
    component.cachedTeachers = mockedTeachers;
    component.teacher = mockedTeachers[0];
    component.id = +component.teacher.id;
    expect((component as any).getPreviousTeacherIndex() === 3).toBeTruthy();
  });

  it('should get previous teacher name', () => {
    component.cachedTeachers = mockedTeachers;
    component.teacher = mockedTeachers[0];
    component.id = +component.teacher.id;
    expect(component.getPreviousTeacherName() === 'mock1 mock1').toBeTruthy();
  });

  it('should get next teacher index', () => {
    component.cachedTeachers = mockedTeachers;
    component.teacher = mockedTeachers[0];
    component.id = +component.teacher.id;
    expect((component as any).getNextTeacherIndex() === 1).toBeTruthy();
  });

  it('should get next teacher name', () => {
    component.cachedTeachers = mockedTeachers;
    component.teacher = mockedTeachers[0];
    component.id = +component.teacher.id;
    expect(component.getNextTeacherName() === 'mock1 mock1').toBeTruthy();
  });

  it('should correctly find an image that was chosen', () => {
    const mockedEvent = {
      target: {
        src: 'mock-src',
        getAttribute(attr) {
          return this[attr];
        }
      }
    };
    component.selectedImg = null;
    component.onImageClick(mockedEvent);
    expect(component.selectedImg).toBe('mock-src');
  });

  it('should find cached teacher', () => {
    component.cachedTeachers = [
      {
        id: 1,
        firstName: 'mock1',
        lastName: 'mock1',
        position: 'head',
        about: 'mock',
        department: ['mock'],
        photo: {
          id: '0',
          link: '',
          title: ''
        },
        lang: 'mock',
      }
    ];
    expect((component as any).findTeacher(1)).not.toBeNull();
  });
});
