import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTeachersListComponent, TeacherItem } from './all-teachers-list.component';
import { MockRouter } from '../../../shared/tests/mock-routes';
import { ConnectionBackend,
         RequestOptions,
         BaseRequestOptions,
         Http,
        } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterLinkStubDirective } from '../../../shared/tests/router-stub';
import { Observable } from 'rxjs/Observable';
import { ServerGetterService,
         LocalizatorService,
         SpinnerService,
         DetectBrowserService,
        } from '../../../shared/services';
import { TeachersPreviewItemComponent } from '../teachers-preview-item';
import { ShowNextButtonComponent } from '../../../modules/mscommon-module/components';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AllTeachersListComponent', () => {
  let component: AllTeachersListComponent;
  let fixture: ComponentFixture<AllTeachersListComponent>;
  let mockRouter: MockRouter;
  let serverGetterService: ServerGetterService;

  const teachersMock = {
    'data': [
      {
        'id': '220',
        'email': 'email@mymail.com',
        'about': 'mock',
        'photo': {
          'id' : '502',
          'link' : 'mockLink',
          'title' : 'mockTitle'
        },
        'firstName': 'С.',
        'lastName': 'Рябов',
        'department': [{
          'id': '83',
          'name': 'depName'
        }],
        'position': 'Голова'
      },
      {
        'id': '200',
        'email': 'email@mymail.com',
        'about': 'mock',
        'photo': {
          'id' : '518',
          'link' : 'mockLink',
          'title' : 'mockTitle'
        },
        'firstName': 'Н.',
        'lastName': 'Гриднєва',
        'department': [{
          'id': '83',
          'name': 'depName'
        }],
        'position': 'Вчитель'
      },
      {
        'id': '206',
        'email': 'email@mymail.com',
        'about': 'mock',
        'photo': {
          'id' : '515',
          'link' : 'mockLink',
          'title' : 'mockTitle'
        },
        'firstName': 'С.',
        'lastName': 'Рябова',
        'department': [{
          'id': '83',
          'name': 'depName',
        }],
        'position': 'Вчитель'
      }
    ],
  };

  beforeEach(async(() => {
    mockRouter = new MockRouter();
    TestBed.configureTestingModule({
      declarations: [
        AllTeachersListComponent,
        TeachersPreviewItemComponent,
        ShowNextButtonComponent,
        RouterLinkStubDirective,
      ],
      providers: [
        Http,
        { provide: Router, useValue: mockRouter },
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: [ { extended: true } ]
            }
          }
        },
        ServerGetterService,
        SpinnerService,
        LocalizatorService,
        DetectBrowserService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTeachersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serverGetterService = TestBed.get(ServerGetterService);
    spyOn(serverGetterService, 'get').and.returnValue(Observable.create((observer) => {
      observer.next({ data: teachersMock });
    }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get teachers', () => {
    const initialTeachersCountLength = component.teachers.length;
    (component as any).applyLoadedTeachers({ data: teachersMock });
    expect(component.teachers.length).toEqual(initialTeachersCountLength + 1);
  });
});
