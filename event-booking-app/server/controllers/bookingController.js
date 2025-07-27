import Booking from '../models/Booking.js';
import Event from '../models/Event.js';

export const bookEvent = async (req, res) => {
  try {
    const { eventId, quantity } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const totalPrice = event.price * quantity;

    const booking = new Booking({
      user: req.user.id,
      event: eventId,
      quantity,
      totalPrice,
    });

    await booking.save();
    res.status(201).json({ message: 'Booking successful', booking });
  } catch (error) {
    res.status(500).json({ message: 'Booking failed', error });
  }
};


// GET /api/bookings/my-bookings
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate({
      path: 'event',
      select: 'title date price',
    });

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error in getMyBookings:', error);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

