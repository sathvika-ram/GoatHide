import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretgoatkey';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'ADMIN' | 'CUSTOMER';
  };
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Forbidden. Invalid session token.' });
      }

      req.user = decoded as AuthRequest['user'];
      next();
    });
  } else {
    // Check if token exists in cookie
    const tokenCookie = req.cookies?.token;
    if (tokenCookie) {
      jwt.verify(tokenCookie, JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
          return res.status(403).json({ error: 'Forbidden. Invalid session token.' });
        }
        req.user = decoded as AuthRequest['user'];
        next();
      });
    } else {
      res.status(401).json({ error: 'Unauthorized. Credentials missing.' });
    }
  }
};
