import { z } from 'zod';

export const registerUserBody = z.object({
  name: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export const loginBody = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export const refreshTokenBody = z.object({
  refreshToken: z.string()
});

export const logoutBody = z.object({
  refreshToken: z.string()
});

export const registerUserSchema = z.object({
  body: registerUserBody
});

export const loginSchema = z.object({
  body: loginBody
});

export const refreshTokenSchema = z.object({
  body: refreshTokenBody
});

export const logoutSchema = z.object({
  body: logoutBody
});

export const getCurrentUserSchema = z.object({});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
