import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLinkStubDirective } from '../../../shared/tests/router-stub';
import { AuthService } from './../../../shared/services';
import {
  ConnectionBackend,
  RequestOptions,
  BaseRequestOptions,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { LocalizatorPipe } from './../../../shared/pipes';
import { LocalizatorService } from './../../../shared/services';
import { ServerGetterService } from '../../../shared/services';
import { SpinnerService } from '../../../shared/services/spinner/spinner.service';
import { DetectBrowserService } from '../../../shared/services';

import { UserStateComponent } from './user-state.component';

describe('UserStateComponent', () => {
  let component: UserStateComponent;
  let fixture: ComponentFixture<UserStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserStateComponent,
        RouterLinkStubDirective,
        LocalizatorPipe
      ],
      providers: [
        ServerGetterService,
        {provide: ConnectionBackend, useClass: MockBackend},
        {provide: RequestOptions, useClass: BaseRequestOptions},
        Http,
        SpinnerService,
        DetectBrowserService,
        LocalizatorService,
        {provide: AuthService, useValue: {
          _isLoggedIn: true,
          _isAdminLoggedIn: true,
          _isCMLoggedIn: false,
          logOut: function() {
            this._isLoggedIn =
              this._isAdminLoggedIn =
                this._isCMLoggedIn = false;
          }
        }}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log out', () => {
    component.logOut();
    expect(component.isLoggedIn() || component.isAdminLoggedIn() || component.isCMLoggedIn()).toBeFalsy();
  });
});
