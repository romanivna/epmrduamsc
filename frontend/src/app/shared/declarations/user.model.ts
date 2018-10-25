export interface User {
  login: string;
  phone: string;
  email: string;
  role: string;
  lastName: string;
  firstName: string;
  id: string;
  password: string;
}

export interface UsersRequestParams {
  _start: number;
  _limit: number;
}

export interface UserStream {
  users: User[];
  canLoadMore: boolean;
}
