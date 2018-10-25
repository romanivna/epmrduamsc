import { TestBed, inject, async } from '@angular/core/testing';

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

describe('TeachersService: ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
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

  it('should construct', inject([TeachersService], (service: TeachersService) => {
    expect(service).toBeDefined();
  }));

  describe('communication with backend: ', () => {
    let subject: TeachersService = null,
        backend: MockBackend = null;
    beforeEach(inject([TeachersService, MockBackend], (teachersService: TeachersService, mockBackend: MockBackend) => {
      subject = teachersService;
      backend = mockBackend;
    }));

    it('should get teachers', async(() => {
      backend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          body: JSON.stringify([{success: true}, {success: false}])
        });
        connection.mockRespond(new Response(options));
      });
      subject.getTeachers().subscribe((res) => {
        expect(res[0]).toEqual({success: true});
      });
    }));

    it('should get teachers by department id', async(() => {
      backend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          body: JSON.stringify([{success: true}, {success: false}])
        });
        connection.mockRespond(new Response(options));
      });
      subject.getTeachersByDepartmentId(5, 'uk').subscribe((res) => {
        expect(res[0]).toEqual({success: true});
      });
    }));

  });

});
