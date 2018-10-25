import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../../../../shared/declarations';
import { UserService } from '../../../services/user.service';
import { PartialObserver } from 'rxjs/Observer';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  public confirmQuestion;
  public canLoadMore: boolean;
  public currentUserLogin: string;
  public error: string;
  public errorTimeout = 1500;
  private users: User[];
  private userForDeleteLogin: string;
  private observer: PartialObserver<Array<User>>;
  private deleteObserver: PartialObserver<any>;
  private start: number;
  private limit = 8;
  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
    this.start = 0;
    this.observer = {
      next: this.applyLoadedUsers.bind(this),
      error: this.applyError.bind(this, 'load-user-error')
    };
    this.deleteObserver = {
      next: this.applyDeleting.bind(this),
      error: this.applyError.bind(this, 'delete-error')
    };

  }

  ngOnInit() {
    this.confirmQuestion = null;
    this.currentUserLogin = this.userService.getCurrentUserLogin;
    this.canLoadMore = true;
    this.getUsers();
  }

  private getUsers(): void {
    this.userService.getUsers(this.start, this.limit).subscribe(this.observer);
  }

  private applyLoadedUsers(data: User[]): void {
    if (data.length < this.limit) {
      this.canLoadMore = false;
    }
    this.users = data;
    this.start += this.limit;
  }

  private applyError(error: string): void {
    this.error = error;
  }

  private applyDeleting(): void {
    this.getUsers();
  }

  public loadMore(): void {
    this.limit += 8;
    this.getUsers();
  }

  public handleError($event): void {
    this.error = null;
    this.limit = 8;
    this.getUsers();
  }

  public deleteUser(user: User): void {
    this.userForDeleteLogin = user.login;
    this.confirmQuestion = {
      text: 'Delete user ',
      itemHeader: this.userForDeleteLogin,
      itemName: '?'
    };
  }

  public voteForDeleting(answer: boolean): void {
    this.confirmQuestion = null;
    if (answer) {
      this.userService.deleteUser(this.userForDeleteLogin)
        .subscribe(this.deleteObserver);
    }
    this.userForDeleteLogin = '';
  }

  public editUser(user: User): void {
    this.userService.editUser(user);
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
