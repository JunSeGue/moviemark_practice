export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string
}

export interface AuthError extends Error {
  statusCode?: number;
  code?: string;
}

export interface DecodedToken {
  sub: string;        // 유저 ID
  exp: number;        // 만료 시간
}

export interface User {
  id: number;
  email: string;
  is_active: boolean;
}