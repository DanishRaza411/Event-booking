import express from 'express';
import { registerUser } from '../controllers/authController.js';
import { login } from '../controllers/authController.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login)

export default router;
