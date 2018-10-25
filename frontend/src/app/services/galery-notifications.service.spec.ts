import { TestBed, inject } from '@angular/core/testing';

import { GaleryNotificationsService } from './galery-notifications.service';

describe('GaleryNotificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GaleryNotificationsService]
    });
  });

  it('should ...', inject([GaleryNotificationsService], (service: GaleryNotificationsService) => {
    expect(service).toBeTruthy();
  }));
});
