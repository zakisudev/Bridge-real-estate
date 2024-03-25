import { Router } from "express";
import UserController from "../controllers/User.controller";
import {
  authentication,
  generateAccessToken,
  response,
  authHeader,
} from "../middlewares/Auth";

let router: Router = Router();

router
  .post("/", UserController.create)
  .get("/", authHeader, UserController.findAll)
  .get("/get-paged", authHeader, UserController.getPaged)
  .get("/:id", authHeader, UserController.findOne)
  .put("/", authHeader, UserController.update)
  .post("/login", authentication, generateAccessToken, response)
  .delete("/:id", UserController.delete);

export default router;
