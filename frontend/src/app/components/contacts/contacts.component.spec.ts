import { async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  Http,
  ConnectionBackend,
  RequestOptions,
  BaseRequestOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContactsComponent } from './contacts.component';
import { ServerGetterService } from '../../shared/services/server-getter/server-getter.service';
import { SpinnerService } from '../../shared/services/spinner/spinner.service';
import { DetectBrowserService } from '../../shared/services';
import { LocalizatorPipe, LocalizatorFromObjectPipe } from '../../shared/pipes';
import { LocalizatorService } from '../../shared/services';
import { ICredentials, Credentials } from 'app/declarations';
import { TestScheduler } from 'rxjs/Rx';



class MockLocalization {
  public _currentLang = 'ru';
  public langUpdateSubj: Subject<string> = new Subject();

  currentLang(): string {
    return this._currentLang;
  }

  currentLocaleObservable(): Observable<string> {
    return this.langUpdateSubj.asObservable();
  }

  translate(key): string {
    return 'ss';
  }
}


describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;
  let serverGetterService: ServerGetterService;
  let localizatorService: LocalizatorService;
  let domSanitizer: DomSanitizer;
  let mockService: any;
  let mockStore: any;
  let sut: any;
  let scheduler: TestScheduler;

  const credentialsMock = {
    address: 'address',
    phones: [ '1', '2', '3' ],
    faxes: [ '1', '2', '3' ],
    email: 'email',
    openingHours: [ '1', '2' ]
  };

  const contactsMock  = {
    address: 'address',
    phones: [ '1', '2', '3' ],
    faxes: [ '1', '2', '3' ],
    email: 'email'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContactsComponent,
        LocalizatorPipe,
        LocalizatorFromObjectPipe
      ],
      providers: [
        ServerGetterService,
        Http,
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        { provide: LocalizatorService, useClass: MockLocalization},
        SpinnerService,
        DetectBrowserService
    ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    domSanitizer = TestBed.get(DomSanitizer);
    localizatorService = TestBed.get(LocalizatorService);
    serverGetterService = TestBed.get(ServerGetterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get news from server', () => {
    scheduler = new TestScheduler( (a, b) => { expect(a).toEqual(b); } );
    mockStore = scheduler.createHotObservable('--a-a-b-', {
      a: { data: { credentialsMock, contactsMock } },
      b: { data: { credentialsMock } }
    });
    mockService = {
      get: () => {
        return mockStore;
      }
    };
    sut = new ContactsComponent(mockService, localizatorService, domSanitizer );
    sut.ngOnInit();
    scheduler
      .expectObservable(sut.contacts)
      .toBe('--a-a-b-', {
        a: { credentialsMock, contactsMock },
        b: { credentialsMock }
      });
    scheduler.flush();
  });

  it('should call getFrameUrl on language change', () => {
    spyOn(component, 'getMapsIframeParameters');
    <any>fixture.debugElement.injector.get(LocalizatorService as any).langUpdateSubj.next('en');
    expect(component.getMapsIframeParameters).toHaveBeenCalled();
  });

  it('getFrameUrl should set url property', () => {
    fixture.detectChanges();
    <any>fixture.debugElement.injector.get(LocalizatorService as any).langUpdateSubj.next('en');
    expect(component.mapsUrlParameters).toBeTruthy();
  });

});
