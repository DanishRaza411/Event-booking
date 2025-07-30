import express from 'express';
import { getMyBookings, bookEvent } from '../controllers/bookingController.js';
import { verifyToken, authorizeRoles } from '../middlewares/auth.js';
import {getBookingsForOrganizer} from '../controllers/bookingController.js'

const router = express.Router();

router.post('/', verifyToken, authorizeRoles('customer'), bookEvent);
router.get('/my-bookings', verifyToken, authorizeRoles('customer'), getMyBookings);

// organizer
// routes/bookingRoutes.js
router.get('/organizer-bookings', verifyToken, authorizeRoles('organizer'), getBookingsForOrganizer);


export default router;
