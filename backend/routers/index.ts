import { Application } from "express";
import UserRoutes from "./User.routes";
import PropertyRoutes from "./Property.routes";

const ROUTES = (app: Application) => {
  app.use("/api/user", UserRoutes);
  app.use("/api/prop", PropertyRoutes);
};

export default ROUTES;
