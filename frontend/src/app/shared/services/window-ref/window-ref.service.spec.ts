import { TestBed, inject } from '@angular/core/testing';

import { WindowRefService } from './window-ref.service';

describe('WindowRefService', () => {
  const service = new WindowRefService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowRefService]
    });
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should have global methods', () => {
    const window: any = service.nativeWindow;
    expect(!!window.alert).toBeTruthy();
    expect(!!window.setTimeout).toBeTruthy();
    expect(!!window.XMLHttpRequest).toBeTruthy();
  });
});
