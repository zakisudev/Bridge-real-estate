import { Router } from "express";
import PropertyController from "../controllers/Property.controller";
import { authHeader } from "../middlewares/Auth";

/**
 * The router for handling property routes.
 */
let router: Router = Router();

/**
 * Get all properties.
 * @route GET /
 */
router
  .get("/", PropertyController.findAll)

  /**
   * Get paged properties.
   * @route GET /get-paged
   */
  .get("/get-paged", PropertyController.getPaged)

  /**
   * Get a property by ID.
   * @route GET /:id
   * @param id - The ID of the property.
   */
  .get("/:id", PropertyController.findById)

  /**
   * Create a new property.
   * @route POST /
   * @middleware authHeader - Middleware for authentication header.
   */
  .post("/", authHeader, PropertyController.create)

  /**
   * Update an existing property.
   * @route PUT /
   * @middleware authHeader - Middleware for authentication header.
   */
  .put("/", authHeader, PropertyController.update)

  /**
   * Delete a property by ID.
   * @route DELETE /:id
   * @param id - The ID of the property.
   * @middleware authHeader - Middleware for authentication header.
   */
  .delete("/:id", authHeader, PropertyController.delete);

export default router;
