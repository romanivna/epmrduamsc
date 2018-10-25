import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../shared/services';

@Component({
  selector: 'app-user-state',
  templateUrl: 'user-state.component.html',
  styleUrls: ['user-state.component.scss']
})
export class UserStateComponent implements OnInit {

  public role: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  isAdminLoggedIn(): boolean {
    this.role = 'admin';
     return this.authService.isAdminLoggedIn;
  }

  isCMLoggedIn(): boolean {
    this.role = 'content manager';
    return this.authService.isCMLoggedIn;
  }

  logOut(): void {
    this.authService.logOut();
  }
}
