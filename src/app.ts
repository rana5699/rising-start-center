import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import globalErrorHandler from './utils/globalError';
import notFound from './utils/notFound';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

// Use the imported router
// app.use("/api", routers);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// global error Handler
app.use(globalErrorHandler);

// not found
app.use(notFound);


export default app;