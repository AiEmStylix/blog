import express, { NextFunction, Request, Response } from 'express';
import mainRouter from './routes/index';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(express.json());

app.use('/api', mainRouter);

// 404 handler (must be after all routes)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use(errorHandler);

export default app;
