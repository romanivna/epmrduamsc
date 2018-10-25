import { TestBed, inject, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import {
  Http,
  ResponseOptions,
  Response,
  BaseRequestOptions
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { SpinnerService } from '../spinner/spinner.service';
import { EditorInsertImageService } from './editor-insert-image.service';
import { ServerGetterService } from './../../../shared/services';
import { DetectBrowserService } from './../../../shared/services';

declare const CKEDITOR: any;

const data = {
  id: '220',
  link: 'http://mock/mock.jpg'
};

describe('EditorInsertImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ServerGetterService,
        EditorInsertImageService,
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

  let dep: ServerGetterService = null,
      backend: MockBackend = null,
      service: EditorInsertImageService = null;

  beforeEach(inject([ServerGetterService, MockBackend], (serverGetterService: ServerGetterService, mockBackend: MockBackend) => {
    dep = serverGetterService;
    backend = mockBackend;
    service = new EditorInsertImageService(dep);
  }));

  it('should create custome tab', () => {
    const spy = spyOn(service, 'createCustomeTab');
    service.upload();
    expect(spy).toHaveBeenCalled();
  });

  it('should create custome fields', () => {
    const spy = spyOn(service, 'dialogCallback').and.callThrough();
    const ev = {
      data: {
        name: 'image',
        definition: {
          addContents() {
            ev.contents.push(arguments[0]);
          }
        }
      },
      contents: [],
    };
    spy(ev);
    expect(ev.contents[0].title).toBe('Upload');
  });

  it('should post image to server', async(() => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify(data)
      });
      connection.mockRespond(new Response(options));
    });
    const event = {
      target: [
        {
          files: [{ name: 'mock.jpg' }],
          value: 'test\\test\\test.test'
        }
      ],
      preventDefault() { }
    };
    const reader = {
      readAsDataURL(path: string) {
        this.onloadend({});
      }
    };
    spyOn(window, 'FileReader').and.returnValue(reader);
    CKEDITOR.handleImageUpload(event);
    service.upload();
    dep.post('', {}, {}).subscribe(({id, link}) => {
      expect(id).toEqual(data.id);
    });
  }));

});
