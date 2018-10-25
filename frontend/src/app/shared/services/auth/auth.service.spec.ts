import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  it('should create', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should login and logout correctly', inject([AuthService], (service: AuthService) => {
    service.login('admin', 'azazaazaza', 'admin');
    service.logOut();
    expect((service as any)._isLoggedIn).toBeFalsy();
  }));

  it('should login and logout as admin correctly', inject([AuthService], (service: AuthService) => {
    service.login('ROLE_ADMIN', 'azazaazaza', 'admin');
    expect(service.isLoggedIn).toBeTruthy();
    expect(service.isAdminLoggedIn).toBeTruthy();
    service.logOut();
    expect((service as any)._isLoggedIn).toBeFalsy();
  }));
});
