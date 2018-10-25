import { TestBed, inject } from '@angular/core/testing';

import { DetectBrowserService } from './detect-browser.service';

describe('DetectBrowserService', () => {
  const service = new DetectBrowserService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetectBrowserService]
    });
    window.navigator['__defineGetter__']('userAgent', function(){
      return 'Safari/537.36 Edge/13.10586';
    });
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should detect browser name', () => {
    expect(service.name()).toBe('Edge');
  });

  it('should return true if browser is Edge', () => {
    expect(service.isEDGE()).toBeTruthy();
  });

  it('should return true if browser is IE11', () => {
    window.navigator['__defineGetter__']('userAgent', function(){
      return 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 3.5.30729; rv:11.0)';
    });
    expect(service.isIE11()).toBeTruthy();
  });

});
