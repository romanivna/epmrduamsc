import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../../../shared/declarations';
import { UserService } from '../../services/user.service';
import { PartialObserver } from 'rxjs/Observer';

@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.component.html',
  styleUrls: ['./personal-account.component.scss']
})
export class PersonalAccountComponent implements OnInit {
  public currentUserLogin: string;
  public currentUserId: string;
  public user: User;
  // private id: string;
  private userForDeleteLogin: string;
  private observer: PartialObserver<User>;
  private deleteObserver: PartialObserver<any>;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentUserLogin = this.userService.getCurrentUserLogin;
    // this.currentUserId = this.userService.getCurrentUserId;
    this.getUser();
  }

  private getUser(): void {
    this.userService.getUser(this.currentUserLogin).subscribe(user => this.user = user);
  }

    public editUser(user: User): void {
    this.userService.editUser(user);
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

}
