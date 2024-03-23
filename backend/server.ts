require("dotenv").config();
import express, { Request, Response } from "express";
import cors from "cors";
import initializeDB from "./utilities/database/sequelize";
import ROUTES from "./routers";
import logger from "./utilities/loggers/log";
import passport from "passport";
import passportConfig from "./utilities/passport/passport";
import UserService from "./services/User.service";

const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport
app.use(
  require("express-session")({
    secret: "bridge-key",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(passportConfig.localStrategy);

passport.serializeUser(function (user: any, done: Function) {
  done(null, user);
});
passport.deserializeUser(function (user: any, done) {
  done(null, user);
});

// Initialize database
initializeDB();

// Initialize routes
ROUTES(app);

// Start server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
