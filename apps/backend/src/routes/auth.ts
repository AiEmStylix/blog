import { NextFunction, Request, Response, Router } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { createUser, getUserByUsername, verifyPassword } from '../models/user.model';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import { loginDto, LoginInput, registerDto, RegisterInput } from '../dto/auth.dto';

const router = Router();
const JWTSECRET = process.env.JWT_SECRET as string;

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body: RegisterInput = registerDto.parse(req.body);

    if (!body.username || !body.password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await createUser(body.username, body.email ?? null, body.password);

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body: LoginInput = loginDto.parse(req.body);
    const { username, password } = body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = getUserByUsername(username);

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const valid = await verifyPassword(user, password);

    if (!valid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const payload = { id: user.id, username: user.username };

    const token = jwt.sign(payload, JWTSECRET, {
      expiresIn: '5m',
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/me', authMiddleware, (req: AuthRequest, res: Response) => {
  res.json({
    message: 'Authenticated request',
    user: req.user,
  });
});

export const authRouter = router;
