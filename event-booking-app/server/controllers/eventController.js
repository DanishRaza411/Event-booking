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
    const events = await Event.find({ createdBy: req.user._id });
    res.json(events);
  } catch (error) {
    console.error('Get my events error:', error);
    res.status(500).json({ message: 'Server error' });
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

