export interface RegisterModel {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

export interface Auth {
  email: string;
  password: string;
}
