import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { LocalizatorService } from './..';
import { ServerGetterService } from './..';
import {
  Http,
  BaseRequestOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { SpinnerService } from '../spinner/spinner.service';
import { DetectBrowserService } from '../../../shared/services';
import { Subject } from 'rxjs/Subject';

const data = {
  'Hello': 'Привет'
};

describe('LocalizatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ServerGetterService,
        LocalizatorService,
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

  it('should retrieve data', inject([ServerGetterService], (dep: ServerGetterService) => {
    spyOn(dep, 'get').and.returnValue(Observable.create((observer) => {
      observer.next({data});
    }));
    const service = new LocalizatorService(dep);
    (service as any)._translations = {};
    Promise.resolve(service.getTranslations()).then(() => expect((service as any)._translations).toBe(data));

  }));

  it('should return current language', inject([ServerGetterService], (dep: ServerGetterService) => {
      spyOn(dep, 'get').and.returnValue(Observable.create((observer) => {
        observer.next({data});
      }));
      const service = new LocalizatorService(dep);
      let langX;
      service.currentLocaleObservable().subscribe((lang) => {
        langX = lang;
      });
      service.use('en');
      expect(langX).toEqual('en');
    }
  ));
});
