import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { RouterLinkStubDirective, RouterStub } from '../../../../shared/tests/router-stub';
import { RouteNormalizerPipe } from '../../pipes';
import { OnLinkFocusedDirective } from './';
import {
  ConnectionBackend,
  RequestOptions,
  BaseRequestOptions,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { LocalizatorPipe } from './../../../../shared/pipes';
import { LocalizatorService } from './../../../../shared/services';

import { ServerGetterService } from './../../../../shared/services';
import { SpinnerService } from './../../../../shared/services/spinner/spinner.service';
import { DetectBrowserService } from './../../../../shared/services';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavigationComponent,
        RouterLinkStubDirective,
        RouteNormalizerPipe,
        LocalizatorPipe,
        OnLinkFocusedDirective
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        ServerGetterService,
        {provide: ConnectionBackend, useClass: MockBackend},
        {provide: RequestOptions, useClass: BaseRequestOptions},
        Http,
        SpinnerService,
        LocalizatorService,
        DetectBrowserService
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ToggleMenuState: ', () => {
    it('should open menu with all submenus closed', () => {
      const keys = Object.keys(component.menuDropdownState);
      let answer = true;
      const CURRENT_MENU = 'menuState';
      component.menuDropdownState[CURRENT_MENU] = false;
      component.toggleMenuState(CURRENT_MENU);
      keys.forEach((key) => {
        answer = (key !== CURRENT_MENU) ? answer && !component.menuDropdownState[key] : answer;
      });
      answer = answer && component.menuDropdownState[CURRENT_MENU];
      expect(answer).toBeTruthy();
    });

    it('should close menu with all submenus closed', () => {
      const keys = Object.keys(component.menuDropdownState);
      let answer = true;
      const CURRENT_MENU = 'menuState';
      component.menuDropdownState[CURRENT_MENU] = true;
      component.toggleMenuState(CURRENT_MENU);
      keys.forEach((key) => {
        answer = (key !== CURRENT_MENU) ? answer && !component.menuDropdownState[key] : answer;
      });
      answer = answer && !component.menuDropdownState[CURRENT_MENU];
      expect(answer).toBeTruthy();
    });

    it('should open submenu and close all others', () => {
      const keys = Object.keys(component.menuDropdownState);
      let answer = true;
      const CURRENT_MENU = 'about us';
      component.menuDropdownState[CURRENT_MENU] = false;
      component.toggleMenuState(CURRENT_MENU);
      keys.forEach((key) => {
        answer = (key !== CURRENT_MENU && key !== 'menuState') ? answer && !component.menuDropdownState[key] : answer;
      });
      answer = answer && component.menuDropdownState[CURRENT_MENU] && component.menuDropdownState.menuState;
      expect(answer).toBeTruthy();
    });
  });
});
