import { TestBed, inject, async } from '@angular/core/testing';
import { LocalizatorPipe } from './localizator.pipe';
import { LocalizatorService } from '../services';
import {
  Http,
  BaseRequestOptions,
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { ServerGetterService } from '../services';
import { SpinnerService } from '../services';
import { DetectBrowserService } from '../../shared/services';

describe('TranslatePipe', () => {
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
  it('create an instance', inject([LocalizatorService], (localizatorService) => {
    const pipe = new LocalizatorPipe(localizatorService);
    expect(pipe).toBeTruthy();
  }));
});
