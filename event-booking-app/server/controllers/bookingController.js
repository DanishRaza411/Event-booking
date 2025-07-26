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


export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('event');
    res.json(bookings);
  } catch (error) {
    console.error('Get My Bookings Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
