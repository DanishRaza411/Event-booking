import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BrowseEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then((res) => {
        const approved = res.data.filter(e => e.status === 'approved');
        setEvents(approved);
      })
      .catch((err) => {
        console.error('Error fetching events:', err);
      });
  }, []);

  const handleBooking = async (eventId, price) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.role !== 'customer') {
    return alert('Please login as customer to book');
  }

  try {
    await axios.post('http://localhost:5000/api/bookings', {
      eventId,
      quantity: 1
    }, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });
    alert('Booking successful!');
  } catch (err) {
    console.error(err);
    alert('Booking failed');
  }
};


  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Browse Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
            <p className="text-gray-800 font-medium mt-1">${event.price}</p>
            <p className="text-sm text-gray-500">{event.category}</p>
            <Link
              to={`/events/${event._id}`}
              className="mt-2 inline-block bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              View Details
            </Link>
            <button
        onClick={() => handleBooking(event._id, event.price)}
        className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
        Book Now
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default BrowseEvents;
