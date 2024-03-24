import { Router } from "express";
import PropertyController from "../controllers/Property.controller";
import { authHeader } from "../middlewares/Auth";

let router: Router = Router();

router
  .get("/", PropertyController.findAll)
  .get("/:id", PropertyController.findById)
  .post("/", authHeader, PropertyController.create)
  .put("/", authHeader, PropertyController.update)
  .delete("/:id", authHeader, PropertyController.delete);

export default router;
