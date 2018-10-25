import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalizatorService } from './../../../shared/services';
import { ServerGetterService } from './../../../shared/services';
import {
  Http,
  BaseRequestOptions,
  ResponseOptions,
  Response,
  URLSearchParams
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {SpinnerService} from './../../../shared/services';
import { DetectBrowserService } from './../../../shared/services';

import { LocalizationComponent } from './localization.component';

describe('LocalizationComponent', () => {
  let component: LocalizationComponent;
  let fixture: ComponentFixture<LocalizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalizationComponent ],
      providers: [
        ServerGetterService,
        LocalizatorService,
        MockBackend,
        BaseRequestOptions,
        SpinnerService,
        DetectBrowserService,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [ MockBackend, BaseRequestOptions ]
        }
    ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
