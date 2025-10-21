import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import postsRoutes from './routes/posts';
import categoriesRouter from './routes/categories';

const app = express();

app.use(express.json());
app.use('/api/posts', postsRoutes);
app.use('/api/categories', categoriesRouter);

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
