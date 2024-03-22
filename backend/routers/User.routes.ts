import { Router } from "express";
import UserController from "../controllers/User.controller";

let router: Router = Router();

router
  .post("/", UserController.create)
  .get("/", UserController.findAll)
  .get("/:id", UserController.findOne)
  .put("/", UserController.update)
  .put("/:id", UserController.update)
  .post("/login", (req, res) => {
    res.send("Users Login route is working ...");
  })
  .put("/reset", (req, res) => {
    res.send("Users Reset route is working ...");
  })
  .put("/change-pwd", (req, res) => {
    res.send("Users Change Password route is working ...");
  })
  .delete("/:id", UserController.delete);

export default router;
