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
    <div className="min-h-screen bg-gray-300 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
          Discover Exciting Events
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {event.title}
                </h2>
                <p className="text-gray-600 text-sm mb-3">
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-lg font-semibold text-indigo-600 mb-3">
                  ${event.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 capitalize bg-gray-100 rounded-full px-3 py-1 inline-block mb-4">
                  {event.category}
                </p>
                <div className="flex space-x-3">
                  <Link
                    to={`/events/${event._id}`}
                    className="flex-1 text-center bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleBooking(event._id, event.price)}
                    className="flex-1 text-center bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BrowseEvents;