import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { decode } from "punycode";

let authHeader = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jsonwebtoken.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    }
  );
};

export const generateAccessToken = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  let user = req.user;

  req.token = jsonwebtoken.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: "1800s",
    }
  );
  next();
};

export default authHeader;
