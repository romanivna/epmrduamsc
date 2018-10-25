import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsPreviewComponent } from './departments-preview.component';
import { LocalizatorPipe } from '../../../../shared/pipes';
import { RouterLinkStubDirective } from '../../../../shared/tests/router-stub';
import { TitleComponent, DepartmentsItemPreviewComponent, ConfirmationModalWindowComponent, SpinnerComponent, NgForNumberPipe } from '..';
import { RouteNormalizerPipe } from '../../pipes';
import { ServerGetterService, SpinnerService, DetectBrowserService, LocalizatorService } from '../../../../shared/services';
import { Http, ConnectionBackend, BaseRequestOptions, RequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../../../../shared/tests/mock-routes';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


const langId = 'ru';

const data = [
  {
    description: 'mock',
    educationType: 1,
    head_id: '211',
    id: '104',
    img: {
      id: 2255,
      title: 'mockTitle',
      link: 'mockLink'
    },
    lang_Id: '2',
    name: 'mockName',
    teachers: null,
  }
];

describe('DepartmentsPreviewComponent', () => {
  let component: DepartmentsPreviewComponent;
  let fixture: ComponentFixture<DepartmentsPreviewComponent>;
  let mockActivatedRoute: MockActivatedRoute;
  let localizatorService: LocalizatorService;
  let serverGetterService: ServerGetterService;

  beforeEach(async(() => {
    mockActivatedRoute = new MockActivatedRoute({ id: '1' });
    TestBed.configureTestingModule({
      declarations: [
        DepartmentsPreviewComponent,
        DepartmentsItemPreviewComponent,
        ConfirmationModalWindowComponent,
        SpinnerComponent,
        TitleComponent,
        RouterLinkStubDirective,
        LocalizatorPipe,
        NgForNumberPipe,
        RouteNormalizerPipe,
      ],
      providers: [
        Http,
        { provide: ActivatedRoute, useValue: mockActivatedRoute},
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        ServerGetterService,
        SpinnerService,
        DetectBrowserService,
        {provide: LocalizatorService, useClass: MockLocalizatorService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentsPreviewComponent);
    component = fixture.componentInstance;
    serverGetterService = TestBed.get(ServerGetterService);
    localizatorService = TestBed.get(LocalizatorService);
    // fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(localizatorService, 'currentLocaleObservable').and.returnValue(Observable.create(observer => {
      observer.next();
    }));
    const spy = spyOn(serverGetterService, 'get').and.returnValue(Observable.create(observer => {
      observer.next({ data: data });
    }));
    component.changeLanguage();
    expect(spy).toHaveBeenCalled();
  });
});

class MockLocalizatorService extends LocalizatorService {
  constructor() {
    super(null);
  }

  currentLocaleObservable() {
    return Observable.of(langId);
  }
}
