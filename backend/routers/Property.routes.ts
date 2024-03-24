import { Router } from "express";
import PropertyController from "../controllers/Property.controller";
import { authHeader } from "../middlewares/Auth";

let router: Router = Router();

router
  .get("/", PropertyController.findAll)
  .get("/:id", PropertyController.findById)
  .post("/", authHeader, PropertyController.create)
  .put("/", authHeader, PropertyController.update)
  .delete("/:id", (req, res) => {
    res.send("Property DELETE route is working ...");
  });

export default router;
