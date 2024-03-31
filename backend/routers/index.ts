import { Application } from "express";
import UserRoutes from "./User.routes";
import PropertyRoutes from "./Property.routes";

/**
 * Registers the routes for the application.
 *
 * @param {Application} app - The Express application instance.
 */
const ROUTES = (app: Application) => {
  app.use("/api/user", UserRoutes);
  app.use("/api/prop", PropertyRoutes);
};

export default ROUTES;
