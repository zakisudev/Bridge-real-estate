import { NextFunction, Request, Response } from "express";
import passportConfig from "../utilities/passport/passport";
import jsonwebtoken from "jsonwebtoken";
import UserDal from "../dals/User.dal";
import passport from "passport";
import { User } from "../models";

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

export { authHeader, generateAccessToken, authentication, response };
