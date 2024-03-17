require("dotenv").config();
import express, { Request, Response } from "express";
import cors from "cors";
import initializeDB from "./utilities/database/sequelize";

const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializeDB();

// Routes
app.use("/api", (req: Request, res: Response) => {
  res.send("API is running ...");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
