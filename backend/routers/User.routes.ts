import { Router } from "express";
import UserController from "../controllers/User.controller";
import {
  authentication,
  generateAccessToken,
  response,
  authHeader,
  isAdmin,
} from "../middlewares/Auth";

let router: Router = Router();

router
  .post("/", UserController.create)
  .get("/", authHeader, isAdmin, UserController.findAll)
  .get("/get-paged", authHeader, isAdmin, UserController.getPaged)
  .get("/:id", authHeader, UserController.findOne)
  .put("/", authHeader, UserController.update)
  .post("/login", authentication, generateAccessToken, response)
  .post("/logout", authHeader, UserController.logout)
  .delete("/:id", UserController.delete);

export default router;
