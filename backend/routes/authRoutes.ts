import express from 'express';
import { protectAdminAndUser } from '../middlewares/authMiddleware';
import { register, login, logout } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', protectAdminAndUser, logout);

export default router;
