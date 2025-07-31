import express from 'express';
import { createEvent, getAllEvents, getMyEvents, getPendingEvents, updateEventStatus} from '../controllers/eventController.js';
import { verifyToken, authorizeRoles } from '../middlewares/auth.js';
import {deleteEvent, getSingleEvent} from '../controllers/eventController.js'

const router = express.Router();

// POST /api/events - Only organizers can create events
router.post('/', verifyToken, authorizeRoles('organizer'), createEvent);
router.get('/my-events', verifyToken, authorizeRoles('organizer'), getMyEvents);
router.get('/', getAllEvents); // ⬅️ This is the new public route

router.get('/pending', verifyToken, authorizeRoles('admin'), getPendingEvents);
router.patch('/:id/status', verifyToken, authorizeRoles('admin'), updateEventStatus);
router.delete('/:id', verifyToken, authorizeRoles('admin'),deleteEvent)

// single event details
router.get('/:id', getSingleEvent);


export default router;
