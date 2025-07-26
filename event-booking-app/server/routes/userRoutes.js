import express from 'express';
import { getAllUsers, updateUserById, deleteUserById } from '../controllers/userController.js';
import { verifyToken, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();

// Only accessible by admin
router.get('/', verifyToken, authorizeRoles('admin'), getAllUsers);
router.put('/:id', verifyToken, authorizeRoles('admin'), updateUserById);
router.delete('/:id', verifyToken, authorizeRoles('admin'), deleteUserById);

export default router;
