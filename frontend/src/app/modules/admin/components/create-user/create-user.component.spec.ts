import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CreateUserComponent } from './create-user.component';

import {
  ConnectionBackend,
  RequestOptions,
  BaseRequestOptions,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { LocalizatorPipe } from './../../../../shared/pipes';
import { LocalizatorService,
         ServerGetterService,
         SpinnerService,
         DetectBrowserService
        } from './../../../../shared/services';

import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { RouterStub } from '../../../../shared/tests/router-stub';

describe('CreateRoleComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let serverGetterService: ServerGetterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserComponent, LocalizatorPipe ],
      providers: [
        FormBuilder,
        { provide: Router, useClass: RouterStub },
        ServerGetterService,
        {provide: ConnectionBackend, useClass: MockBackend},
        {provide: RequestOptions, useClass: BaseRequestOptions},
        Http,
        SpinnerService,
        LocalizatorService,
        DetectBrowserService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serverGetterService = TestBed.get(ServerGetterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set error correctly', () => {
    const allErrorTypes1 = {
      required: true
    };
    component.setError(component.emailError, allErrorTypes1, 'Email');
    expect(component.emailError.value).toEqual('Email is required');

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
    component.setError(component.emailError, allErrorTypes3, 'Email');
    expect(component.emailError.value).toEqual('Email should be correct');
  });

  it('should create user', () => {
    component.successMsg = '';
    spyOn(serverGetterService, 'post').and.returnValue(Observable.create((obs) => {
      obs.next({message: 'mock'});
    }));
    component.createUser({});
    fixture.whenStable().then(() => expect(component.successMsg).toBe('User is created'));
  });

  it('should return error if something is wrong', () => {
    component.successMsg = '';
    spyOn(serverGetterService, 'post').and.returnValue(Observable.create((obs) => {
      obs.next({});
    }));
    component.createUser({});
    fixture.whenStable().then(() => expect(component.successMsg).toBe('Such user exists'));
  });

});
