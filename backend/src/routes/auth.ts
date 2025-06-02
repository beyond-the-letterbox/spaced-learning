import { Router } from 'express';
import { authenticateToken } from "../middleware";
import { authController } from "../controllers";

const router = Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/refresh', authController.refreshToken);

router.post('/logout', authController.logout);

router.get('/me', authenticateToken, authController.getCurrentUser);

export default router;