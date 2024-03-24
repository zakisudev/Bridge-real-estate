export interface AuthResponse {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export interface AuthState {
  user: AuthResponse | null;
  loading: boolean;
  error: string | null;
}
