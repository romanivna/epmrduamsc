import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private _isLoggedIn: boolean;
  private _isAdminLoggedIn: boolean;
  private _isCMLoggedIn: boolean;

  constructor() {
    this.checkPermission(localStorage.getItem('role'));
  }

  login(role, token, login): void {
    this.checkPermission(role);
    localStorage.setItem('role', role);
    localStorage.setItem('auth-token', token);
    localStorage.setItem('login', login);
  }

  checkPermission(role) {
    this._isLoggedIn = !!role;
    this._isAdminLoggedIn = (role === 'ROLE_ADMIN');
    this._isCMLoggedIn = (role === 'ROLE_CONTENT_MANAGER');
  }

  logOut(): void {
    this._isLoggedIn =
      this._isAdminLoggedIn =
        this._isCMLoggedIn = false;
    localStorage.setItem('role', '');
    localStorage.setItem('auth-token', '');
    localStorage.setItem('login', '');
  }

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  get isAdminLoggedIn() {
    return this._isAdminLoggedIn;
  }

  get isCMLoggedIn() {
    return this._isCMLoggedIn;
  }

  get currentUserLogin() {
    return localStorage.getItem('login');
  }
}
