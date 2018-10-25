import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

import { InitialPageComponent } from './initial-page.component';
import { RouterLinkStubDirective, RouterStub } from '../../../../shared/tests/router-stub';
import { AuthService } from '../../../../shared/services';

import {
  ConnectionBackend,
  RequestOptions,
  BaseRequestOptions,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { LocalizatorPipe } from './../../../../shared/pipes';
import { SpinnerService, DetectBrowserService, ServerGetterService, LocalizatorService } from './../../../../shared/services/';
import {GaleryNotificationsService} from '../../../../services/';

describe('InitialPageComponent', () => {
  let component: InitialPageComponent;
  let fixture: ComponentFixture<InitialPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InitialPageComponent,
        LocalizatorPipe,
        RouterLinkStubDirective
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        ServerGetterService,
        {provide: ConnectionBackend, useClass: MockBackend},
        {provide: RequestOptions, useClass: BaseRequestOptions},
        Http,
        SpinnerService,
        LocalizatorService,
        AuthService,
        DetectBrowserService,
        GaleryNotificationsService
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change menu state correctly', () => {
    component.menuStateOpened = false;
    component.changeMenuState(true);
    expect(component.menuStateOpened).toBeTruthy();
  });

  it('shouldn\'t change menu if it already exists', () => {
    component.menuStateOpened = false;
    component.changeMenuState(false);
    expect(component.menuStateOpened).toBeFalsy();
  });
});
