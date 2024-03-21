import express from 'express';
import {
  protectAdminAndUser,
  protectAdmin,
} from '../middlewares/authMiddleware';
import {
  getUsers,
  getUserProfile,
  deleteUserProfile,
  updateUserProfile,
} from '../controllers/userController';

const router = express.Router();

router.route('/').get(protectAdmin, getUsers);
router
  .route('/profile')
  .get(protectAdminAndUser, getUserProfile)
  .put(protectAdminAndUser, updateUserProfile)
  .delete(protectAdminAndUser, deleteUserProfile);

export default router;
