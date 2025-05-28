import { Request } from 'express';

export interface User {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export type RegisterUserApiResponse = {
  user: Omit<User, 'password_hash'>;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};

export interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string };
}
