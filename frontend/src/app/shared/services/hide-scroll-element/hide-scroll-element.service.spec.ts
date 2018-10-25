import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HideScrollElementService } from './hide-scroll-element.service';

describe('hide-scrollService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HideScrollElementService
      ]
    });
  });

  it('should create', inject([HideScrollElementService], (hideScrollService: HideScrollElementService) => {
    expect(hideScrollService).toBeTruthy();
  }));

  it('should emit hide', inject([HideScrollElementService], (hideScrollService: HideScrollElementService) => {
    hideScrollService.notificationsStream.subscribe(data => {
      expect(data).toBe('hide');
    });
    hideScrollService.hideElement();
  }));

  it('should emit show', inject([HideScrollElementService], (hideScrollService: HideScrollElementService) => {
    hideScrollService.notificationsStream.subscribe(data => {
      expect(data).toBe('show');
    });
    hideScrollService.showElement();
  }));


  it('should return observable', inject([HideScrollElementService], (hideScrollService: HideScrollElementService) => {
    expect(hideScrollService.notificationsStream).toEqual(jasmine.any(Observable));
  }));
});
