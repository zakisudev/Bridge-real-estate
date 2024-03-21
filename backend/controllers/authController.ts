import bcrypt from 'bcrypt';
import generateToken from '../helpers/generateToken';
import { Request, Response } from 'express';
import User from '../models/User';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req: Request, res: Response) => {
  try {
    const { username, firstName, lastName, email, password, avatar } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res
        .status(400)
        .send({ message: 'User already exists', success: false });
    }

    const user = await User.create({
      username,
      firstName,
      lastName,
      email,
      password: bcrypt.hash(password, 10),
      avatar,
    });

    if (!user) {
      res.status(400).send({ message: 'Invalid user data', success: false });
    }
    res.status(201).json({
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token: generateToken(user),
    });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(400)
        .send({ message: 'Invalid email or password', success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .send({ message: 'Invalid email or password', success: false });
    }

    res.status(200).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user),
    });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

// @desc    Logout user
// @route   GET /api/auth/logout
// @access  Private
const logout = async (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: 'Logged out successfully' });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

export { register, login, logout };
