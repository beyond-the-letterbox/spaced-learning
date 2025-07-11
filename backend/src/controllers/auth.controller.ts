import { authService } from '../services';
import { AuthenticatedRequest } from '../models';
import { Response } from 'express';
import { BaseController } from './base.controller';

export class AuthController extends BaseController {
  public register = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { email, password, name } = req.body;

    const data = await authService.register(email, password, name);

    res.status(201).json({ status: 'success', data });
  }

  public login = async(req: AuthenticatedRequest, res: Response) => {
    const { email, password } = req.body;

    const data = await authService.login(email, password);

    res.status(200).json({  status: 'success', data });
  }

  public refreshToken = async (req: AuthenticatedRequest, res: Response) => {
    const { refreshToken } = req.body;

    const data = await authService.refreshToken(refreshToken);

    res.status(200).json({  status: 'success', data });
  }

  public logout = async (req: AuthenticatedRequest, res: Response) => {
    const { refreshToken } = req.body;

    await authService.logout(refreshToken);

    res.status(200).json({ status: 'success' });
  }

  public getCurrentUser = async (req: AuthenticatedRequest, res: Response) => {
    const userId = this.extractAuthenticatedUserId(req, res);

    const data = await authService.getCurrentUser(userId);

    res.status(200).json({ status: 'success', data });
  }
}

export const authController = new AuthController();
