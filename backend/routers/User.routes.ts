import { Router } from "express";
import UserController from "../controllers/User.controller";
import {
  authentication,
  generateAccessToken,
  response,
  authHeader,
  isAdmin,
} from "../middlewares/Auth";

/**
 * Router for handling user-related routes.
 */
let router: Router = Router();

router
  /**
   * Create a new user.
   */
  .post("/", UserController.create)

  /**
   * Get all users.
   * Requires authentication and admin privileges.
   */
  .get("/", authHeader, isAdmin, UserController.findAll)

  /**
   * Get paged users.
   * Requires authentication and admin privileges.
   */
  .get("/get-paged", authHeader, isAdmin, UserController.getPaged)

  /**
   * Get a user by ID.
   * Requires authentication.
   */
  .get("/:id", authHeader, UserController.findOne)

  /**
   * Update a user.
   * Requires authentication.
   */
  .put("/", authHeader, UserController.update)

  /**
   * User login.
   * Requires authentication and generates an access token.
   */
  .post("/login", authentication, generateAccessToken, response)

  /**
   * User logout.
   * Requires authentication.
   */
  .post("/logout", authHeader, UserController.logout)

  /**
   * Delete a user by ID.
   */
  .delete("/:id", UserController.delete);

export default router;
