import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAccountComponent } from './personal-account.component';
import { TitleComponent, SpinnerComponent, NgForNumberPipe } from '../../../mscommon-module/components';
import { LocalizatorPipe } from '../../../../shared/pipes';
import { RouteNormalizerPipe } from '../../../mscommon-module/pipes';
import { RouterLinkStubDirective } from '../../../../shared/tests/router-stub';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../services/user.service';
import { User } from '../../../../shared/declarations';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalizatorService, SpinnerService, ServerGetterService } from '../../../../shared/services';
import { MockRouter } from '../../../../shared/tests/mock-routes';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, ConnectionBackend, RequestOptions } from '@angular/http';

let mockUsers: User[];
mockUsers = [
  {
    login: 'Login',
    phone: 'Phone',
    email: 'email@email.ru',
    role: 'ROLE_ADMIN',
    firstName: 'firstname',
    lastName: 'firstname',
    id: 'id',
    password: 'password'

  },
  {
    login: 'admin',
    phone: 'Phone',
    email: 'email@email.ru',
    role: 'ROLE_ADMIN',
    firstName: 'firstname',
    lastName: 'firstname',
    id: 'id',
    password: 'password'
  },
  {
    login: 'Petro',
    phone: 'Phone',
    email: 'email@email.ru',
    role: 'ROLE_ADMIN',
    firstName: 'firstname',
    lastName: 'firstname',
    id: 'id',
    password: 'password'
  },
  {
    login: 'Ivan',
    phone: 'Phone',
    email: 'email@email.ru',
    role: 'ROLE_ADMIN',
    firstName: 'firstname',
    lastName: 'firstname',
    id: 'id',
    password: 'password'
  },
  {
    login: 'Deletovich',
    phone: 'Phone',
    email: 'email@email.ru',
    role: 'ROLE_ADMIN',
    firstName: 'firstname',
    lastName: 'firstname',
    id: 'id',
    password: 'password'
  }
];

class MockGetter {
  get() {
    return Observable.of({
      data: mockUsers
    });
  }

  getUser() {
    return Observable.of(mockUsers);
  }

  delete() {
    return Observable.create((observer) => {
      observer.next({
        status: 200
      });
    });
  }

  editUser() {
    return Observable.create((observer) => {
      observer.next({
        status: 200
      });
    });
  }
}

const activatedUrl = '/url';

describe('PersonalAccountComponent', () => {
  let component: PersonalAccountComponent;
  let fixture: ComponentFixture<PersonalAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PersonalAccountComponent,
        TitleComponent,
        LocalizatorPipe,
        SpinnerComponent,
        RouteNormalizerPipe,
        RouterLinkStubDirective,
        NgForNumberPipe,
      ],
      providers: [
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        { provide: Router, useClass: MockRouter},
        { provide: ActivatedRoute, useValue:  activatedUrl },
        { provide: UserService, useClass: MockGetter },
        { provide: ServerGetterService, useClass: MockGetter },
        LocalizatorService,
        SpinnerService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUsers on init', () => {
    let getUserStub;
    getUserStub = spyOn(component, 'getUser');
    component.ngOnInit();
    expect(getUserStub).toHaveBeenCalled();
  });

});
