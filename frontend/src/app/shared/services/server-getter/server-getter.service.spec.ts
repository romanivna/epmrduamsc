import {TestBed, inject, async} from '@angular/core/testing';
import {
  Http,
  Response,
  BaseRequestOptions,
  ResponseOptions,
  URLSearchParams
} from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

import {MockBackend, MockConnection} from '@angular/http/testing';

import {ServerGetterService} from './server-getter.service';
import createSpy = jasmine.createSpy;
import {SpinnerService} from '../spinner/spinner.service';
import { DetectBrowserService } from '../../../shared/services';

describe('ServerGetterService: ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ServerGetterService,
        MockBackend,
        BaseRequestOptions,
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

  it('should construct', inject([ServerGetterService], (service: ServerGetterService) => {
    expect(service).toBeDefined();
  }));

  describe('communication with backend: ', () => {
    let subject: ServerGetterService = null,
      backend: MockBackend = null;
    beforeEach(inject([ServerGetterService, MockBackend], (serverGetterService: ServerGetterService, mockBackend: MockBackend) => {
      subject = serverGetterService;
      backend = mockBackend;
    }));

    it('should send a get request to server', async(() => {
      backend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          body: JSON.stringify([{success: true}, {success: false}])
        });
        connection.mockRespond(new Response(options));
      });
      subject.get('').subscribe((res) => {
        expect(res[0]).toEqual({success: true});
      });
    }));

    it('should send a post request to server', async(() => {
      backend.connections.subscribe((connection: MockConnection) => {
        const response = [
            {'id': 1, 'name': 'department1', 'img': 'img/department1'},
            {'id': 2, 'name': 'department2', 'img': 'img/department2'}
          ],
          options = new ResponseOptions({
            body: JSON.stringify(response)
          });
        connection.mockRespond(new Response(options));
      });
      subject.post('', '', '').subscribe((res) => expect(!!res).toBeTruthy());
    }));

    it('should create params for request of correct type', () => {
      expect((subject as any).getUrlSearchParams({success: true}) instanceof URLSearchParams).toBeTruthy();
    });

    it('should create params for request', () => {
      expect((subject as any).getUrlSearchParams({success: true}).has('success')).toBeTruthy();
    });

    it('should create request with params', () => {
      expect((subject as any).getRequest('', {success: true}).url.indexOf('success') !== -1).toBeTruthy();
    });

    it('should send a delete request to server', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          body: JSON.stringify([{success: true}, {success: false}])
        });
        connection.mockRespond(new Response(options));
      });
      subject.delete('').subscribe((res) => {
        expect(res[0]).toEqual({success: true});
      });
    });

    it('should send a put request to server', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          body: JSON.stringify([{success: true}, {success: false}])
        });
        connection.mockRespond(new Response(options));
      });
      subject.update('', {}).subscribe((res) => {
        expect(res[0]).toEqual({success: true});
      });
    });
  });

  describe('handleError: ', () => {
    let subject: ServerGetterService = null;
    beforeEach(inject([ServerGetterService], (serverGetterService: ServerGetterService) => {
      subject = serverGetterService;
    }));
    it('should throw an error message from string',
      async(() => {
        subject.handleError('error').subscribe(() => {
          fail('error is expected');
        }, (err) => {
          expect(err).toEqual('error');
        });
      })
    );

    it('should throw an error message from object',
      async(() => {
        subject.handleError({message: 'error'}).subscribe(() => {
          fail('error is expected');
        }, (err) => {
          expect(err).toEqual('error');
        });
      })
    );

    it('should throw an error message from response object',
      async(() => {
        const options = new ResponseOptions({
          body: {
            error: 'error'
          }
        });
        const response = new Response(options);
        subject.handleError(response).subscribe(() => {
          fail('error is expected');
        }, (err) => {
          expect(err).toContain('error');
        });
      })
    );

    it('should throw an error message from response object without error in body',
      async(() => {
        const options = new ResponseOptions({});
        const response = new Response(options);
        subject.handleError(response).subscribe(() => {
          fail('error is expected');
        }, (err) => {
          expect(err).toBeDefined();
        });
      })
    );
  });
});
