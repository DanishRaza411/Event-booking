import express from 'express';
import { getMyBookings, bookEvent } from '../controllers/bookingController.js';
import { verifyToken, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', verifyToken, authorizeRoles('customer'), bookEvent);
router.get('/my-bookings', verifyToken, authorizeRoles('customer'), getMyBookings);

export default router;
