import { useEffect, useState } from 'react';
import api from '../../services/api';

function CustomerBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get('/bookings/my-bookings');
        setBookings(res.data);
      } catch (err) {
        console.error('Failed to load bookings:', err);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-600">You haven’t booked any events yet.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map(booking => (
            <li key={booking._id} className="p-4 bg-white shadow rounded-xl">
              <h3 className="text-xl font-semibold">{booking.event.title}</h3>
              <p>Date: {new Date(booking.event.date).toLocaleString()}</p>
              <p>Location: {booking.event.location}</p>
              <p>Quantity: {booking.quantity}</p>
              <p>Total Price: Rs. {booking.totalPrice}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomerBookings;

