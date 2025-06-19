import { PrismaClient } from '@prisma/client';
import { RegisterUserApiResponse, User } from '../models';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  JWT_EXPIRES_IN,
  JWT_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET
} from './auth.config';

export class AuthService {
  #prisma!: PrismaClient;

  constructor() {
    this.#prisma = new PrismaClient();
  }

  /**
   * Register a new user
   * @param email - The user's email address
   * @param password - The user's password (will be hashed)
   * @param name - Optional display name
   * @returns Promise with the created user (without password)
   * @throws Will throw if email is already registered
   */
  public async register(
    email: string,
    password: string,
    name?: string
  ): Promise<RegisterUserApiResponse> {
    const existingUser = await (this.#prisma as any).users.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new Error('Email is already registered');
    }

    const hashedPassword = await this.hashPassword(password);
    const user = await this.#prisma.users.create({
      data: {
        email,
        password_hash: hashedPassword,
        name: name || email.split('@')[0]
      }
    });
    const { password_hash, ...userWithoutPassword } = user;
    const tokens = this.generateTokens(user);

    return {
      user: userWithoutPassword as Omit<User, 'password_hash'>,
      tokens
    };
  }

  /**
   * Login a user
   * @param email - The user's email address
   * @param password - The user's password
   * @returns Promise with the user (without password) and tokens
   * @throws Will throw if email is not found or password is invalid
   */
  public async login(email: string, password: string): Promise<RegisterUserApiResponse> {
    const user = await this.#prisma.users.findUnique({ where: { email } });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const { password_hash, ...userWithoutPassword } = user;
    const tokens = this.generateTokens(user);

    return {
      user: userWithoutPassword as Omit<User, 'password_hash'>,
      tokens
    };
  }

  /**
   * Refresh token
   * @param refreshToken - The user's refresh token
   * @returns Promise with new access token
   * @throws Will throw if user is not found
   * @description This method will refresh the token of the user.
   * It will return a new token if the user is found and the token is valid.
   * If the user is not found or the token is invalid, it will throw an error.
   */
  public async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as { id: number };

      const user = await this.#prisma.users.findUnique({ where: { id: payload.id } });

      if (!user) {
        return Promise.reject(new Error('User not found'));
      }

      const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

      return { accessToken };
    } catch (error: any) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }

  public async logout(refreshToken: string): Promise<void> {
    return;
  }

  /**
   * Get user by ID
   * @param userId - The user's ID
   * @returns Promise with the user (without password)
   * @throws Will throw if user is not found
   */
  public async getCurrentUser(userId: number): Promise<User> {
    const user = await this.#prisma.users.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(password, salt);
  }

  private generateTokens(user: User): { accessToken: string; refreshToken: string } {
    const accessToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });
    const refreshToken = jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET!, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN
    });

    return { accessToken, refreshToken };
  }
}

export const authService = new AuthService();
