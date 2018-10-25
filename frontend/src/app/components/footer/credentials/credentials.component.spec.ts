import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ConnectionBackend,
  RequestOptions,
  BaseRequestOptions,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { LocalizatorPipe, LocalizatorFromObjectPipe } from './../../../shared/pipes';
import { LocalizatorService } from './../../../shared/services';
import { ServerGetterService } from '../../../shared/services';
import { SpinnerService } from '../../../shared/services/spinner/spinner.service';
import { DetectBrowserService } from '../../../shared/services';

import { CredentialsComponent } from './credentials.component';
import { Observable } from 'rxjs/Observable';
import { TestScheduler } from 'rxjs/Rx';

describe('CredentialsComponent', () => {
  let fixture: ComponentFixture<CredentialsComponent>;
  let component: CredentialsComponent;
  let serverGetterService: ServerGetterService;
  let mockService: any;
  let mockStore: any;
  let sut: any;
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler( (a, b) => { expect(a).toEqual(b); } );

    TestBed.configureTestingModule({
      declarations: [CredentialsComponent, LocalizatorPipe, LocalizatorFromObjectPipe],
      providers: [
        ServerGetterService,
        SpinnerService,
        DetectBrowserService,
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        Http,
        LocalizatorService
      ]
    });

    fixture = TestBed.createComponent(CredentialsComponent);
    component = fixture.componentInstance;
    serverGetterService = TestBed.get(ServerGetterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get credentials from server', () => {
    mockStore = scheduler.createHotObservable('--a-a-b', {
      a: { data: { address: 'STUB', email: 'STUB', phone: 'falcon' } },
      b: { data: { address: 'mock', email: 'mock', phone: 'mock' } }
    });
    mockService = {
      get: () => {
        return mockStore;
      }
    };
    sut = new CredentialsComponent(mockService);

    scheduler
      .expectObservable(sut.credentials)
      .toBe('--a-a-b', {
        a: { address: 'STUB', email: 'STUB', phone: 'falcon'  },
        b: { address: 'mock', email: 'mock', phone: 'mock'  },
      });
    scheduler.flush();
  });

  it('should get social links from server', () => {
    mockStore = scheduler.createHotObservable('--x-x-y', {
      x: { data: [{ name: 'STUB', link: 'STUB', faIcon: 'falcon' }] },
      y: { data: [{ name: 'mock', link: 'mock', faIcon: 'mock' }] }
    });
    mockService = {
      get: () => {
        return mockStore;
      }
    };
    sut = new CredentialsComponent(mockService);

    scheduler
      .expectObservable(sut.socialLinks)
      .toBe('--x-x-y', {
        x: [{ name: 'STUB', link: 'STUB', faIcon: 'falcon' }],
        y: [{ name: 'mock', link: 'mock', faIcon: 'mock' }],
      });
    scheduler.flush();
  });

});
