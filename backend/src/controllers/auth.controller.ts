import {authService} from "../services";
import {AuthenticatedRequest} from "../models";
import {Response} from "express";

export class AuthController {
    public async register(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const { email, password, name } = req.body;
            const user = await authService.register(email, password, name);

            res.status(201).json({
                message: 'Registration successful',
                user,
            });
        } catch (error: any) {
            console.error('Registration error:', error);
            res.status(400).json({ error: error.message || 'Registration failed' });
        }
    }

    public async login(req: AuthenticatedRequest, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ error: 'Email and password are required' });
                return;
            }

            const user = await authService.login(email, password);

            res.status(200).json(user);
        } catch (error: any) {
            console.error('Login error:', error);

            res.status(400).json({ error: error.message || 'Login failed' });
        }
    }

    public async refreshToken(req: AuthenticatedRequest, res: Response) {
            try {
                const { refreshToken } = req.body;

                if (!refreshToken) {
                    res.status(400).json({ error: 'Refresh token is required' });
                }

                const accessToken = await authService.refreshToken(refreshToken);

                res.json({ accessToken });
            } catch (error: any) {
                console.error('Error refreshing token:', error);
                res.status(403).json({ error: error.message || 'Invalid refresh token' });

            }
    }

    public async logout(req: AuthenticatedRequest, res: Response) {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                res.status(400).json({ error: 'Refresh token is required' });
                return;
            }

            await authService.logout(refreshToken);

            res.status(200).json({ message: 'Successfully logged out' });
        } catch (error: any) {
            console.error('Logout error:', error);
            res.status(200).json({ message: 'Successfully logged out' });
        }
    }

    public async getCurrentUser(req: AuthenticatedRequest, res: Response) {
            try {
                const userId = req.user?.id;

                if (!userId) {
                    res.status(401).json({ error: 'User not authenticated' });
                    return;
                }

                const user = await authService.getCurrentUser(userId);
                res.status(200).json(user);
            } catch (error: any) {
                console.error('Error fetching user:', error);
                res.status(500).json({ error: error.message || 'Failed to fetch current user' });
            }
        }

}

export const authController = new AuthController();
