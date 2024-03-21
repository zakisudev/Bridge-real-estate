import { Router } from "express";
import UserController from "../controllers/User.controller";

let router: Router = Router();

router
  .post("/", UserController.create)
  .get("/", UserController.findAll)
  .get("/:id", (req, res) => {
    res.send("Users GET by id route is working ...");
  })
  .post("/login", (req, res) => {
    res.send("Users Login route is working ...");
  })
  .put("/reset", (req, res) => {
    res.send("Users Reset route is working ...");
  })
  .put("/change-pwd", (req, res) => {
    res.send("Users Change Password route is working ...");
  })
  .delete("/", (req, res) => {
    res.send("Users DELETE route is working ...");
  });

export default router;
