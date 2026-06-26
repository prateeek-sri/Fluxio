import express from 'express';
import cors from 'cors';
import indexRoutes from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", indexRoutes);

export default app;