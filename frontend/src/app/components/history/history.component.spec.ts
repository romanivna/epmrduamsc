import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, BaseRequestOptions, ConnectionBackend, RequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SpinnerService } from '../../shared/services/spinner/spinner.service';
import { HistoryComponent } from './history.component';
import { LocalizatorPipe } from './../../shared/pipes';
import { LocalizatorService } from './../../shared/services';
import { Observable } from 'rxjs/Observable';
import { ServerGetterService } from './../../shared/services';
import { DetectBrowserService } from './../../shared/services';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let serverGetterService: ServerGetterService;
  let localizatorService: LocalizatorService;

    beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
      LocalizatorPipe,
      HistoryComponent,
      ],
      providers: [
        ServerGetterService,
        SpinnerService,
        {provide: ConnectionBackend, useClass: MockBackend},
        {provide: RequestOptions, useClass: BaseRequestOptions},
        Http,
        LocalizatorService,
        DetectBrowserService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    serverGetterService = TestBed.get(ServerGetterService);
    localizatorService = TestBed.get(LocalizatorService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 it('should retrieve  data', () => {
    const spy = spyOn(component, 'GetContent');
   localizatorService.use('uk');

    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith();
  });

  it('should called get service in GetContent', () => {
    const spy = spyOn(component, 'GetContent').and.callThrough();
    spyOn(serverGetterService, 'get').and.returnValue(Observable.create((observer) => {
      observer.next('successfully get');
    }));
    component.ngOnInit();
    localizatorService.use('uk');
    fixture.whenStable().then(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  class Service extends ServerGetterService {
    get(a) {
      return Observable.of({
        data: [
          {
            orderNum: 0,
            header: 'ZERO title alala',
            content: 'pampampam pidish',
            img: {
              link: '123',
              id: '123',
              title: ''
            },
            lang: {
              id: '',
              name: 'uk'
            }
          },
          {
            orderNum: 1,
            header: 'ONE title alala',
            content: 'pampampam pidish',
            img: {
              link: '124',
              id: '124',
              title: ''
            },
            lang: {
              id: '',
              name: 'uk'
            }
          }
        ]
      });
    }
  }
});
