export interface UserModel {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  token: string;
}

export interface UserState {
  user: UserModel | null;
  users: UserModel[];
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  avatar?: string;
}
