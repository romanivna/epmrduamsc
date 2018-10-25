import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { UserManagementComponent } from './user-management.component';
import { MSCommonModule } from '../../../../mscommon-module/mscommon.module';
import { Http, ConnectionBackend, RequestOptions, BaseRequestOptions, HttpModule } from '@angular/http';
import { ServerGetterService } from '../../../../../shared/services/server-getter/server-getter.service';
import { MockBackend } from '@angular/http/testing';
import { SpinnerService } from '../../../../../shared/services/spinner/spinner.service';
import { DetectBrowserService } from '../../../../../shared/services/detect-browser/detect-browser.service';
import { LocalizatorService } from '../../../../../shared/services/localizator/localizator.service';
import { User } from '../../../../../shared/declarations';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';


let mockUser: User;
mockUser = {
  login: 'Login',
  phone: 'Phone',
  email: 'email@email.ru',
  role: 'ROLE_ADMIN',
  firstName: 'firstname',
  lastName: 'firstname',
  id: 'id',
  password: 'password'

};

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

  getUsers() {
    return Observable.of(mockUsers);
  }

  delete() {
    return Observable.create((observer) => {
      observer.next({
        status: 200
      });
    });
  }

  deleteUser() {
    return Observable.create((observer) => {
      observer.next({
        status: 200
      });
    });
  }
}

class MockRouter {
  navigate(command: string[], extra) {
    return true;
  }
}

const activatedUrl = '/url';

describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagementComponent ],
      imports: [MSCommonModule, HttpModule],
      providers: [
        { provide: ServerGetterService, useClass: MockGetter},
        Http,
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useValue:  activatedUrl},
        { provide: UserService, useClass: MockGetter },
        SpinnerService,
        DetectBrowserService,
        LocalizatorService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUsers on init', () => {
    let getUsersStub;
    getUsersStub = spyOn(component, 'getUsers');
    component.ngOnInit();
    expect(getUsersStub).toHaveBeenCalled();
  });

  it('should save suggested user for deleting', () => {
    component.deleteUser(mockUser);
    expect(component['userForDeleteLogin']).toBe('Login');
  });

  it('should delete user', () => {
    let getUsersStub;
    let serverStub;
    getUsersStub = spyOn(component, 'getUsers');
    serverStub = spyOn(fixture.debugElement.injector.get(ServerGetterService), 'delete')
      .and.returnValue(Observable.of({
        status: 200
      }));

    component.deleteUser(mockUser);
    component.voteForDeleting(true);

    expect(component['userForDeleteLogin']).toBe('');
    expect(getUsersStub).toHaveBeenCalled();
  });

  it('should call delete user on click', fakeAsync(() => {
    let spy;
    let button;
    spy = spyOn(component, 'deleteUser');
    fixture.detectChanges();
    tick();
    button = fixture.debugElement.nativeElement.querySelector('.user-management__table .fa-times');
    button.click();
    expect(spy).toHaveBeenCalledWith(mockUsers[0]);
  }));

  it('should call edit users on click', fakeAsync(() => {
    let spy;
    let button;
    spy = spyOn(component, 'editUser');
    fixture.detectChanges();
    tick();
    button = fixture.debugElement.nativeElement.querySelector('.user-management__table .fa-pencil');
    button.click();
    expect(spy).toHaveBeenCalled();
  }));

});
