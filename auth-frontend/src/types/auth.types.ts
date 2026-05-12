export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}