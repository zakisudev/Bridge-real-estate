import User from '../models/User';
import { Request, Response } from 'express';

// @desc    Get users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();

    res.status(200).json({ users, success: true });
  } catch (error: any) {
    res.status(404).send({ message: error.message, success: false });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(200)
        .json({ message: 'User not found', success: false });
    }

    res.status(200).json({ user, success: true });
  } catch (error: any) {
    res.status(404).send({ message: error.message, success: false });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(200)
        .json({ message: 'User not found', success: false });
    }

    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.avatar = req.body.avatar || user.avatar;

    await user.save();

    res.status(200).json({ user, success: true });
  } catch (error: any) {
    res.status(404).send({ message: error.message, success: false });
  }
};

// @desc    Delete account
// @route   DELETE /api/users/profile
// @access  Private
const deleteUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(200)
        .json({ message: 'User not found', success: false });
    }

    await user.destroy();

    res.status(200).json({ message: 'Account deleted', success: true });
  } catch (error: any) {
    res.status(404).send({ message: error.message, success: false });
  }
};

export { getUsers, getUserProfile, updateUserProfile, deleteUserProfile };
