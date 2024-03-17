require('dotenv').config();
import express, { Request, Response } from 'express';
import cors from 'cors';

const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', (req: Request, res: Response) => {
  res.send('API is running ...');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
