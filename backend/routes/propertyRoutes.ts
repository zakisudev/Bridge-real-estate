import express from 'express';
import {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../controllers/propertyController';
import { protectAdminAndUser } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/').get(getProperties).post(protectAdminAndUser, createProperty);
router
  .route('/:id')
  .get(getProperty)
  .put(protectAdminAndUser, updateProperty)
  .delete(protectAdminAndUser, deleteProperty);

router
  .route('/:id')
  .get(getProperty)
  .put(updateProperty)
  .delete(deleteProperty);

export default router;
