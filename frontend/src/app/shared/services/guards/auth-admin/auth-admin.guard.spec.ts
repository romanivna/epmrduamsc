import { TestBed, inject } from '@angular/core/testing';
import { AuthAdminGuard } from './auth-admin.guard';
import { AuthService } from './../../';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthAdminGuard', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthAdminGuard,
        AuthService
      ],
      imports: [RouterTestingModule]
    });
  });

  it('should ...', inject([AuthAdminGuard], (guard: AuthAdminGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should detect activation of path', inject([AuthAdminGuard],
    (guard: AuthAdminGuard) => {
      expect(guard.canActivate()).toBeFalsy();
    }));

});
