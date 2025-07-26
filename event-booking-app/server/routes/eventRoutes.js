import express from 'express';
import { createEvent, getAllEvents, getMyEvents} from '../controllers/eventController.js';
import { verifyToken, authorizeRoles } from '../middlewares/auth.js';


const router = express.Router();

// POST /api/events - Only organizers can create events
router.post('/', verifyToken, authorizeRoles('organizer'), createEvent);
router.get('/my-events', verifyToken, authorizeRoles('organizer'), getMyEvents);
router.get('/', getAllEvents); // ⬅️ This is the new public route


export default router;
