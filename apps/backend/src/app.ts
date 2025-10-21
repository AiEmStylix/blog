import express, { Request, Response } from 'express';
import mainRouter from './routes/index';
import { errorHandler } from './middleware/errorHandler';
import path from 'path';
import postRoutes from './routes/posts';

const app = express();

app.use(express.json());
app.use('/api/posts', postRoutes);

// if (process.env.NODE_ENV === 'production') {
//   const staticPath = path.resolve(__dirname, '../../../frontend/dist');
//   console.log('🧱 Serving static from:', staticPath);
//   app.use(express.static(staticPath));

//   app.get(/.*/, (req: Request, res: Response) => {
//     const indexPath = path.resolve(__dirname, '../../../frontend/dist/index.html');
//     console.log('📄 Sending file:', indexPath);
//     res.sendFile(indexPath);
//   });
// }

app.use(errorHandler);

export default app;
