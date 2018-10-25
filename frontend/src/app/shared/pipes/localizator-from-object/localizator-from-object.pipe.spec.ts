import { TestBed, inject, async } from '@angular/core/testing';
import { LocalizatorService } from '../../services';
import { LocalizatorFromObjectPipe } from './localizator-from-object.pipe';
import {
  Http,
  BaseRequestOptions,
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { ServerGetterService } from '../../services';
import { SpinnerService } from '../../services';
import { DetectBrowserService } from '../../../shared/services';

describe('LocalizatorFromObjectPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalizatorService,
        ServerGetterService,
        MockBackend,
        SpinnerService,
        DetectBrowserService,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [ MockBackend, BaseRequestOptions ]
        }
      ]
    });
  });
  it('should create define current language and return translation', inject([LocalizatorService], (localizatorService) => {
    const pipe = new LocalizatorFromObjectPipe(localizatorService);
    localizatorService.use('ru');
    expect(pipe.transform({
      en: 'some-en',
      ru: 'some-ru',
      ua: 'some-ua',
    })).toBe('some-ru');
  }));
});
