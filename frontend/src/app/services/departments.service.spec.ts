import { TestBed, inject, async } from '@angular/core/testing';

import { DepartmentsService } from './departments.service';
import { TeachersService } from './teachers.service';

import { ServerGetterService, LocalizatorService, SpinnerService, DetectBrowserService } from '../shared/services/';


import {
  Http,
  BaseRequestOptions,
  ResponseOptions,
  Response,
  URLSearchParams
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import createSpy = jasmine.createSpy;

const teachersMock = {
  'data': [
    {
      'id': '200',
      'departmentId': '83',
      'lang': 'uk'
    },
    {
      'id': '220',
      'departmentId': '83',
      'position': 'Голова',
      'lang': 'uk'
    },
    {
      'id': '206',
      'departmentId': '83',
      'lang': 'uk'
    }
  ],
  'department': {
    'id': '83',
    'head_id': '220',
    'lang': 'uk'
  }
};

const departmentsWithTeachersMock = {
  departments: teachersMock,
  teachers: {
    'data': [
      {
        'id': '220',
        'departmentId': '83',
        'position': 'Голова',
        'isHead': true,
        'lang': 'uk'
      },
      {
        'id': '200',
        'departmentId': '83',
        'lang': 'uk'
      },
      {
        'id': '206',
        'departmentId': '83',
        'lang': 'uk'
      }
    ],
    'department': {
      'id': '83',
      'head_id': '220',
      'lang': 'uk'
    }
  }
};

describe('DepartmentsService: ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DepartmentsService,
        TeachersService,
        MockBackend,
        BaseRequestOptions,
        ServerGetterService,
        LocalizatorService,
        SpinnerService,
        DetectBrowserService,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  it('should construct', inject([DepartmentsService], (service: DepartmentsService) => {
    expect(service).toBeDefined();
  }));

  describe('communication with backend: ', () => {
    let subject: DepartmentsService = null,
        backend: MockBackend = null;
    beforeEach(inject([DepartmentsService, MockBackend], (departmentsService: DepartmentsService, mockBackend: MockBackend) => {
      subject = departmentsService;
      backend = mockBackend;
    }));

    it('should get departments', async(() => {
      backend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          body: JSON.stringify([{success: true}, {success: false}])
        });
        connection.mockRespond(new Response(options));
      });
      subject.departments.subscribe((res) => {
        expect(res[0]).toEqual({success: true});
      });
    }));

    it('should get departments with teachers', async(() => {
      backend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          body: JSON.stringify(teachersMock)
        });
        connection.mockRespond(new Response(options));
      });
      subject.departmentsWithTeachers(83, 'uk').subscribe((res) => {
        expect(res).toEqual(departmentsWithTeachersMock);
      });
    }));

  });

  it('should construct', inject([DepartmentsService], (service: DepartmentsService) => {
    expect(service.sortHeadTeachers(teachersMock).data[0].id).toBe('220');
  }));

});
