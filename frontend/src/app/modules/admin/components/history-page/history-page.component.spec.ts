import {async, ComponentFixture, TestBed, tick, fakeAsync} from '@angular/core/testing';
import {Pipe, PipeTransform, DebugElement, HostListener} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MockBackend } from '@angular/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {Http, ConnectionBackend, RequestOptions, BaseRequestOptions, HttpModule} from '@angular/http';

import { HistoryPageComponent } from './history-page.component';
import { Ng2ImgMaxService, ImgMaxSizeService, ImgMaxPXSizeService, ImgExifService } from 'ng2-img-max';
import { Ng2PicaService } from 'ng2-pica';
import { AdminModule } from '../../admin.module';
import { MockActivatedRoute, MockRouter } from '../../../../shared/tests/mock-routes';
import { SpinnerService, LocalizatorService, DetectBrowserService } from '../../../../shared/services/';
import {  ServerGetterService, DragAndDropService } from '../../../../shared/services/';
import { GaleryNotificationsService } from '../../../../services/';

describe('HistoryPageComponent', () => {
  let component: HistoryPageComponent;
  let fixture: ComponentFixture<HistoryPageComponent>;
  // let componentAlbum: ConfirmationModalWindowComponent;
  // let fixtureAlbum: ComponentFixture<ConfirmationModalWindowComponent>;
  let imgMaxService: Ng2ImgMaxService;
  let serverGetterService: ServerGetterService;
  let mockActivatedRoute: any;
  // let element: DebugElement;
  // let service: any;
  // let elementForEvent: any;
  let localizatorService: LocalizatorService;
  const data = {
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
  };


  beforeEach(async(() => {
    mockActivatedRoute = new MockActivatedRoute({id: '1'});
    TestBed.configureTestingModule({
      imports: [
        AdminModule
      ],
      declarations: [
        MockLocalizatorPipe
      ],
      providers: [
        FormBuilder,
        DragAndDropService,
        ImgExifService,
        {provide: Ng2ImgMaxService, useValue: imgMaxService},
        ImgMaxSizeService,
        ImgExifService,
        ImgMaxPXSizeService,
        Ng2PicaService,
        // {provide: ServerGetterService, useClass: MockGetter},
        ServerGetterService,
        Http,
        DetectBrowserService,
        {provide: ConnectionBackend, useClass: MockBackend},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: RequestOptions, useClass: BaseRequestOptions},
        {provide: Router, useValue: MockRouter},
        // {provide: LocalizatorService, useClass: MockLocalizatorService},
        LocalizatorService,
        SpinnerService,
        GaleryNotificationsService,
        // ConfirmationModalWindowComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryPageComponent);
    component = fixture.componentInstance;
    // fixtureAlbum = TestBed.createComponent(ConfirmationModalWindowComponent);
    // componentAlbum = fixtureAlbum.componentInstance;
    fixture.detectChanges();
    // fixtureAlbum.detectChanges();
    serverGetterService = TestBed.get(ServerGetterService);
    imgMaxService = TestBed.get(Ng2ImgMaxService);
    localizatorService = TestBed.get(LocalizatorService);
    // mockRouter = TestBed.get(MockRouter);
  });

  function triggerEvents(debugElement: DebugElement, eventName: string, object: any) {
    debugElement.triggerEventHandler(eventName, object);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check image position when get data from BE', () => {
    const spy = spyOn(component, 'checkImagesPosition');
    spyOn(serverGetterService, 'get').and.returnValue(Observable.create((observer) => {
      observer.next(data);
    }));
    component.getData();
    expect(spy).toHaveBeenCalled();
  });

  it('should called changeLanguage when change tabs', () => {
    let el;
    const spy = spyOn(component, 'changeLanguage');
    el = fixture.debugElement.nativeElement.querySelector('.tab li');
    el.click();
    expect(spy).toHaveBeenCalled();
  });

  // it('should get data from BE when language changed', () => {
  //   const spy = spyOn(serverGetterService, 'get').and.returnValue(Observable.create((observer) => {
  //     observer.next(data);
  //   }));
  //   const spy1 = spyOn(component, 'routeGo');
  //   component.changeLanguage('mock');
  //   expect(spy).toHaveBeenCalled();
  // });

  it('should add new field when click on button \'Add field\'', () => {
    const spy = spyOn(component, 'addField');
    const spy2 = spyOn(component, 'checkImagesPosition');
    let el;
    el = fixture.debugElement.nativeElement.querySelector('.history-page__center .history-page__btn');
    el.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should save when click on button \'Save\'', () => {
    const spy = spyOn(component, 'suggestToSave');
    let el;
    el = fixture.debugElement.nativeElement.querySelector('.history-page__tools .history-page__btn--save');
    el.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should cancel when click on button \'Cancel\'', () => {
    const spy = spyOn(component, 'suggestToCancel');
    let el;
    el = fixture.debugElement.nativeElement.querySelector('.history-page__tools .history-page__btn--cancel');
    el.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should correctly recount blocks\' orders', () => {
    component.historyItems = [
      {},
        {
          orderNum: 3,
          header: ' title alala',
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
          orderNum: 0,
          header: ' title alala',
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
      ];
    component.recountOrders();
    expect(component.historyItems[1].orderNum === 0);
    expect(component.historyItems[2].orderNum === 1);
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
    return Observable.of('ru');
  }

  translate(s: string): string {
    return s;
  }
}

  // class MockGetter extends ServerGetterService {
  //   get(a, b, c) {
  //     return Observable.of(data);
  //   }
  // }
});


