import { Router } from "express";
import PropertyController from "../controllers/Property.controller";
import { authHeader } from "../middlewares/Auth";

let router: Router = Router();

router
  .get("/", (req, res) => {
    res.send("Property GET route is working ...");
  })
  .get("/:id", (req, res) => {
    res.send("Property GET by id route is working ...");
  })
  .post("/", authHeader, PropertyController.create)
  .put("/:id", (req, res) => {
    res.send("Property PUT route is working ...");
  })
  .delete("/:id", (req, res) => {
    res.send("Property DELETE route is working ...");
  });

export default router;
