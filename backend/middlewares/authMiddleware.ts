import User from '../models/User';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const protectAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error('Not authorized, no token');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    const user = await User.findOne({ where: { id: (decoded as any).id } });

    if (!user.isAdmin) {
      throw new Error('Unauthorized, not an admin');
    }

    req.user = user;
    next();
  } catch (error: any) {
    res.status(401).send({ error: error.message, success: false });
  }
};

const protectAdminAndUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error('Not authorized, no token');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    const user = await User.findOne({ where: { id: (decoded as any).id } });

    if (!user.isAdmin) {
      throw new Error('Unauthorized, not a user');
    }

    req.user = user;
    next();
  } catch (error: any) {
    res.status(401).send({ error: error.message });
  }
};

export { protectAdmin, protectUser, protectAdminAndUser };
