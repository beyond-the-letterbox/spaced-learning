import { Router, Response } from 'express';
import { authService } from '../services';
import {authenticateToken} from "../middleware";

const router = Router();

router.post('/register', async (req, res) => {
    try {
        const user = await authService.register(req.body.email, req.body.password, req.body.name);
        res.status(201).json(user);

    } catch (error: any) {
        console.error('Registration error:', error);
        res.status(400).json({ error: error.message || 'Registration failed' });
    }
});

router.post('/login', async (req, res) => {
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
});

router.post('/refresh', async (req, res) => {
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
});

router.post('/logout', async (req, res) => {
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
});


router.get('/me', authenticateToken, async (req: any, res: Response) =>  {
    try {
        const userId = req.user.id;

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
});

export default router;