export interface AuthResponse {
  id?: number | undefined;
  username: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  is_admin?: boolean | undefined;
  token?: string | undefined;
  name: string | undefined;
  password?: string | undefined;
  confirmPassword?: string | undefined;
  response?: {
    data: {
      message: string;
    };
    message: string;
  };
}

export interface RegisterResponse {
  user: {
    id: number | undefined;
    username: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    phone: string | undefined;
    is_admin: boolean | undefined;
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
