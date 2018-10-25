import { Injectable } from '@angular/core';
import { urls } from '../../../shared/constants';
import { ServerGetterService } from '../../../shared/services/server-getter/server-getter.service';
import { User, UsersRequestParams} from '../../../shared/declarations/user.model';

@Injectable()
export class UserService {
  private userReqParams: UsersRequestParams;
  private editedUser: User;
  private _start = 0;
  private _limit = 8;
  private id: string;

  constructor(private serverGetterService: ServerGetterService) {
    this.userReqParams = {
      _start: this._start,
      _limit: this._limit
    };
  }

  private prepareParams(start: number, limit: number): void {
    this.userReqParams._limit = this._limit = limit;
    this.userReqParams._start = this._start = start;
  }

  public getUsers(start?: number, limit?: number) {
    // this.prepareParams(start || this._start, limit || this._limit);
    return this.serverGetterService
            .get<Array<User>>(`${urls.api.prod.user_preview}?_limit=${limit}&start=${start}`, true)
            .map(res => {
              return res.data; });
  }

  public getUser(id: string) {
    console.log('heeey');
    return this.serverGetterService
            .get<User>(urls.api.prod.get_user + id)
            .map(res => { return res.data; });
  }


  deleteUser(login: string) {
    return this.serverGetterService.delete(urls.api.prod.delete_user + login);
  }

  editUser(user: User) {
    this.editedUser = user;
  }

  saveUser(user: User) {
    return this.serverGetterService.update(urls.api.prod.update_user + this.editedUser.login, user, false);
  }


  get getCurrentUserLogin(): string {
    return localStorage.getItem('login');
  }

  get getCurrentUserId(): string {
    return localStorage.getItem('id');
  }

  get getEditedUser(): User {
    return this.editedUser;
  }

}

