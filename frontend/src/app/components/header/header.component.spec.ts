import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ConnectionBackend,
  RequestOptions,
  BaseRequestOptions,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { LocalizatorPipe } from './../../shared/pipes';
import { LocalizatorService } from './../../shared/services';

import { HeaderComponent } from './header.component';
import { ServerGetterService } from '../../shared/services';
import { Observable } from 'rxjs/Observable';
import { SpinnerService } from '../../shared/services/spinner/spinner.service';
import { DetectBrowserService } from '../../shared/services';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let serverGetterService: ServerGetterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent, LocalizatorPipe ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        ServerGetterService,
        {provide: ConnectionBackend, useClass: MockBackend},
        {provide: RequestOptions, useClass: BaseRequestOptions},
        Http,
        SpinnerService,
        DetectBrowserService,
        LocalizatorService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serverGetterService = TestBed.get(ServerGetterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get school name and logo from backend', () => {
    spyOn(serverGetterService, 'get').and.returnValue(Observable.create((obs) => {
      obs.next({
        data: {
          name: 'mocked-name',
          logo: 'mocked-img',
          director: 'mocked-director'
        }
      });
    }));
    component.schoolInfo = null;
    (component as any).getSchoolInfo();
    fixture.detectChanges();
    expect(component.schoolInfo).toBeDefined();
  });
});
