import { TestBed, inject } from '@angular/core/testing';
import { UserCreateGuard } from './create-user.guard';
import { AuthService } from './../../../shared/services';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthAdminGuard', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserCreateGuard,
        AuthService
      ],
      imports: [RouterTestingModule]
    });
  });

  it('should ...', inject([UserCreateGuard], (guard: UserCreateGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should detect activation of path', inject([UserCreateGuard],
    (guard: UserCreateGuard) => {
      expect(guard.canActivate()).toBeFalsy();
    }));

});
