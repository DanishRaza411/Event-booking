// server/controllers/eventController.js

import Event from '../models/Event.js';

export const createEvent = async (req, res) => {
  try {
    const { title, description, category, date, location, price } = req.body;

    const newEvent = new Event({
      title,
      description,
      category,
      date,
      location,
      price,
      createdBy: req.user.id,  // ✅ Add this line
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Create Event Error:', error);
    res.status(400).json({ message: error.message });
  }
};
// organizer events
export const getMyEvents = async (req, res) => {
  try {
    const organizerId = req.user.id; // make sure `req.user` is populated by `verifyToken`
    const events = await Event.find({ createdBy: organizerId });
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching organizer events:', error);
    res.status(500).json({ message: 'Failed to fetch your events' });
  }
};



// all events

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (err) {
    console.error('Get Events Error:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// get pending events by admin
export const getPendingEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: 'pending' }).populate('createdBy', 'name email');
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch pending events' });
  }
};

// update event status

export const updateEventStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update event status' });
  }
};

// delete event
export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully.' });
  } catch (err) {
    console.error('Delete Event Error:', err);
    res.status(500).json({ message: 'Failed to delete event.' });
  }
};



// export const approveEvent = async (req, res) => {
//   try {
//     const event = await Event.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
//     res.json(event);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to approve event' });
//   }
// };

// export const rejectEvent = async (req, res) => {
//   try {
//     const event = await Event.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
//     res.json(event);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to reject event' });
//   }
// };

