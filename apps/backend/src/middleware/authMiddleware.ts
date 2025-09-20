import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWTSECRET = process.env.JWT_SECRET as string;

export interface AuthRequest extends Request {
  user?: any;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // "Bearer <token>"

  try {
    const decoded = jwt.verify(token, JWTSECRET);
    req.user = decoded; // attach decoded payload to request
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
