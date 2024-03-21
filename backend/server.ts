require("dotenv").config();
import express, { Request, Response } from "express";
import cors from "cors";
import initializeDB from "./utilities/database/sequelize";
import ROUTES from "./routers";
import logger from "./utilities/loggers/log";

const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database
initializeDB();

// Initialize routes
ROUTES(app);

// Start server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
