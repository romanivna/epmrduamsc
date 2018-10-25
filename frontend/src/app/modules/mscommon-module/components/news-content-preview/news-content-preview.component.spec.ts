import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, BaseRequestOptions, ConnectionBackend, RequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';

import { RouterLinkStubDirective } from '../../../../shared/tests/router-stub';
import { RouteNormalizerPipe, ImageUrlCreatorPipe } from '../../pipes';
import { NewsContentPreviewComponent } from './news-content-preview.component';
import { ServerGetterService } from './../../../../shared/services';
import { SpinnerService } from '../../../../shared/services/spinner/spinner.service';
import { DetectBrowserService } from '../../../../shared/services';
import { Observable } from 'rxjs/Observable';
import { TestScheduler } from 'rxjs/Rx';
import { LocalizatorService } from '../../../../shared/services/localizator';
import { LocalizatorPipe } from '../../../../shared/pipes';
import { Router, ActivatedRoute } from '@angular/router';
import { MockRouter, MockActivatedRoute } from '../../../../shared/tests/mock-routes';

const _ = {
  id: 0,
  img: {
    id: '0',
    link: 'assets/img/violin.png',
    title: ''
  },
  date: '222',
  header: '333566666666666666666666444444444447658',
  content: '444',
  lang: 'ru',
  url: 'mock',
};

const currentLang = 'ru';

describe('NewsContentPreviewComponent', () => {
  let component: NewsContentPreviewComponent;
  let fixture: ComponentFixture<NewsContentPreviewComponent>;
  let serverGetterService: ServerGetterService;
  let localizatorService: LocalizatorService;
  let mockActivatedRoute: any;
  // let mockService: any;
  // let mockStore: any;
  // let sut: any;
  // let scheduler: TestScheduler;

  beforeEach(() => {
    mockActivatedRoute = new MockActivatedRoute({ id: '1' });
    TestBed.configureTestingModule({
      declarations: [
        NewsContentPreviewComponent,
        MockLocalizatorPipe,
      ],
      providers: [
        ServerGetterService,
        SpinnerService,
        DetectBrowserService,
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        { provide: LocalizatorService, useClass: MockLocalizatorService },
        Http,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    });

    fixture = TestBed.createComponent(NewsContentPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serverGetterService = TestBed.get(ServerGetterService);
    localizatorService = TestBed.get(LocalizatorService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get news from server', () => {
    const spy = spyOn(serverGetterService, 'get').and.returnValue(
      Observable.create(observer => {
        observer.next({ data: [_] });
      })
    );
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();

  //   scheduler = new TestScheduler( (a, b) => { expect(a).toEqual(b); } );
  //   mockStore = scheduler.createHotObservable('--a-a-b-', {
  //     a: { data: { id: '0', header: 'Mock text' } },
  //     b: { data: { id: '0', header: 'Mock text 2' } }
  //   });
  //   mockService = {
  //     get: () => {
  //       return mockStore;
  //     }
  //   };
  //   sut = new NewsContentPreviewComponent(mockService, localizatorService);

  //   scheduler
  //     .expectObservable(sut.localizatorService.currentLocaleObservable)
  //     .toBe('--a-a-b-', {
  //       a: { id: '0', header: 'Mock text' },
  //       b: { id: '0', header: 'Mock text 2' }
  //     });
  //   scheduler.flush();
  });

});

@Pipe({ name: 'localizator' })
class MockLocalizatorPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

class MockLocalizatorService extends LocalizatorService {
  constructor() {
    super(null);
  }

  currentLocaleObservable() {
    return Observable.of(currentLang);
  }
}
