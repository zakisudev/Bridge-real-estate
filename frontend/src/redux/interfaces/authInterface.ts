export interface AuthResponse {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  is_admin: boolean;
  token: string;
  name: string;
  response: {
    data: {
      message: string;
    };
    message: string;
  };
}

export interface RegisterResponse {
  user: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    is_admin: boolean;
  };
  name: string;
  response: {
    data: {
      message: string;
    };
    message: string;
  };
}

export interface AuthState {
  user: AuthResponse | null;
  loading: boolean;
  error: string | null;
}
