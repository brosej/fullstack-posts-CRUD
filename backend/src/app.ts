import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import postRoutes from './routes/post.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

//middlewares globales
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/posts', postRoutes);

app.use(({}, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

app.use(errorHandler);

export default app;