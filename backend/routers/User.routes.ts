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
  .get("/:id", authHeader, UserController.findOne)
  .put("/", authHeader, UserController.update)
  .put("/:id", authHeader, UserController.update)
  .post("/login", authentication, generateAccessToken, response)
  .put("/reset", (req, res) => {
    res.send("Users Reset route is working ...");
  })
  .put("/change-pwd", (req, res) => {
    res.send("Users Change Password route is working ...");
  })
  .delete("/:id", UserController.delete);

export default router;
