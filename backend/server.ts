require('dotenv').config();
import express, { Request, Response } from 'express';
import cors from 'cors';
import initializeDB from './utilities/database/sequelize';
import userRoutes from './routes/userRoutes';
import propertyRoutes from './routes/propertyRoutes';
import authRoutes from './routes/authRoutes';

const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializeDB();

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/property', propertyRoutes);
app.use('/api/v1/auth', authRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
