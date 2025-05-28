import {Response, NextFunction, RequestHandler, Request} from "express";
import {AuthenticatedRequest} from "../models";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../services/auth.config";

export const authenticateToken: RequestHandler = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader?.split(' ')[1];

    if (!token) {
        res.status(401).json({ error: 'No token provided!' });
        return;
    }

    jwt.verify(token, JWT_SECRET, (error: any, user: any) => {
        if (error) {
            console.error('Error verifying token:', error);
            res.status(403).json({ error: 'Invalid or expired token!' });
            return;
        }
        req.user = user as { id: string, email: string };
        next();
    });
}
