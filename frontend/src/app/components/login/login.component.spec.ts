import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from './../../shared/services';
import { Router } from '@angular/router';
import { RouterStub } from '../../shared/tests/router-stub';
import { LoginComponent } from './login.component';

import {
  ConnectionBackend,
  RequestOptions,
  BaseRequestOptions,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { LocalizatorPipe } from './../../shared/pipes';
import { LocalizatorService, ServerGetterService } from './../../shared/services';
import { SpinnerService } from '../../shared/services/spinner/spinner.service';
import { DetectBrowserService } from './../../shared/services';

import { Observable } from 'rxjs/Observable';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent, LocalizatorPipe ],
      providers: [
        FormBuilder,
        ServerGetterService,
        {provide: ConnectionBackend, useClass: MockBackend},
        {provide: RequestOptions, useClass: BaseRequestOptions},
        {provide: Router, useClass: RouterStub},
        Http,
        SpinnerService,
        AuthService,
        LocalizatorService,
        DetectBrowserService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set error message if password is not correct', () => {
    spyOn((component as any).http, 'post').and.returnValue(Observable.create((obs) => {
      obs.error({ error: 'mock' });
    }));
    component.login({
      email: 'noadmin@admin',
      password: 'ssssss'
    });
    expect(component.errMessage).toEqual('invalidCredentials');
  });

  it('should verify credentials correctly', () => {
    const spy = spyOn((component as any).authService, 'login');
    spyOn((component as any).router, 'navigate');
    spyOn((component as any).http, 'post').and.returnValue(Observable.create((obs) => {
      obs.next({
        headers: {
          'UserRole': 'mock',
          'Authorization': 'mock',
          get: function(prop: string) {
            return this[prop];
          }
        }
      });
    }));
    component.login({
      email: 'admin@admin',
      password: 'admin'
    });
    fixture.whenStable().then(() => expect(spy).toHaveBeenCalled());
  });

  it('should verify credentials correctly and show error', () => {
    const spy = spyOn((component as any).http, 'post').and.returnValue(Observable.create((obs) => {
      obs.error({ error: 'mock' });
    }));
    component.login({});
    fixture.whenStable().then(() => expect(spy).toHaveBeenCalled());
  });

  it('should detect changes after init', () => {
    const spy = spyOn(component as any, 'detectChangesOnInputs');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should detect changes', () => {
    const control = {
      valueChanges: {
        subscribe(callback) {
          callback();
        }
      },
      invalid: true,
      valid: false
    };
    const error = {};
    const spy = spyOn(control.valueChanges, 'subscribe');
    component.showErrorWithDebounce(control, error, 'email', 1000);
    expect(spy).toHaveBeenCalled();
  });

  it('should set error correctly', () => {
    const allErrorTypes1 = {
      required: true
    };
    component.setError(component.loginError, allErrorTypes1, 'Login');
    expect(component.loginError.value).toEqual('Login is required');

    const allErrorTypes2 = {
      minlength: {
        requiredLength: 5
      }
    };
    component.setError(component.passwordError, allErrorTypes2, 'Password');
    expect(component.passwordError.value).toEqual('Password should have more than 5 symbols');

    const allErrorTypes3 = {
      pattern: true
    };
    component.setError(component.loginError, allErrorTypes3, 'Login');
    expect(component.loginError.value).toEqual('Login should be correct');
  });

});
