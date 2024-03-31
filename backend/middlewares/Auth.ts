import { NextFunction, Request, Response } from "express";
import passportConfig from "../utilities/passport/passport";
import jsonwebtoken from "jsonwebtoken";
import UserDal from "../dals/User.dal";
import passport from "passport";
import { User } from "../models";

/**
 * Middleware function for authentication.
 * Validates the presence of email and password in the request body.
 * Authenticates the user using passport's local strategy.
 * If authentication is successful, the user is logged in and the next middleware is called.
 * If authentication fails, an error response is sent.
 * If an error occurs during authentication, an error response is sent.
 * @param request - The Express request object.
 * @param response - The Express response object.
 * @param next - The next middleware function.
 */
let authentication = (request: Request, response: Response, next: Function) => {
  if (!request.body.email) {
    return response.status(400).json({
      message: "Email required!",
    });
  }
  if (!request.body.password) {
    return response.status(400).json({
      message: "Password required!",
    });
  }

  passport.authenticate(
    "local",
    { session: false },
    (error: Error, user: any, info: any) => {
      if (error) {
        return response.status(500).send(error);
      } else if (!user) {
        return response
          .status(401)
          .json({ message: "Login Failed: Invalid Username or password!" });
      } else {
        request.logIn(user, { session: false }, (error) => {
          if (error) {
            return response
              .status(401)
              .json({ message: "Login Failed: Invalid Username or password!" });
          }
          next();
        });
      }
    }
  )(request, response, next);
};

/**
 * Middleware function to check the authorization header and verify the token.
 * If the token is valid, it sets the user object on the request and calls the next middleware.
 * If the token is invalid or missing, it returns an error response.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
const authHeader = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied", success: false });
  }

  jsonwebtoken.verify(
    token,
    passportConfig.security.secret,
    (err: any, user: any) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Invalid token", success: false });
      }
      req.user = user;
      next();
    }
  );
};

/**
 * Handles the response for an authenticated user.
 * @param req - The request object.
 * @param res - The response object.
 */
const response = (req: any, res: Response) => {
  let user = req.user;

  UserDal.findAuth({ id: user.id });
  res.status(200).json({
    id: user.id,
    token: req.token,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    is_admin: user.is_admin,
    phone: user.phone,
  });
};

/**
 * Generates an access token for the authenticated user.
 *
 * @param request - The HTTP request object.
 * @param response - The HTTP response object.
 * @param next - The next middleware function.
 */
let generateAccessToken = (request: any, response: any, next: Function) => {
  let user: User = request.user;

  request.token = jsonwebtoken.sign(
    {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      is_admin: user.is_admin,
    },
    passportConfig.security.secret
  );

  next();
};

/**
 * Middleware to check if the user is an admin.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function to call.
 */
let isAdmin = (req: any, res: Response, next: NextFunction) => {
  let user: User = req.user;
  if (!user.is_admin) {
    return res
      .status(403)
      .json({ message: "Access denied You Are Not Admin", success: false });
  }
  next();
};

export { authHeader, generateAccessToken, authentication, response, isAdmin };
