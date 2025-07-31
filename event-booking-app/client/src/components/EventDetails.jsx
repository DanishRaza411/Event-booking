import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${eventId}`);
        setEvent(res.data);
      } catch (err) {
        console.error('Failed to fetch event details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  
// boooking event handler
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
      toast.success('Booking successful!');
    } catch (err) {
      toast.error('Booking failed');
      console.error(err);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
    </div>
  );

  if (!event) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-2xl font-semibold text-red-500 bg-red-100 px-6 py-3 rounded-lg">
        Event not found
      </div>
    </div>
  );

  


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl flex items-center justify-center">
        <div className="relative w-full">
<div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-10 pointer-events-none"></div>
          <div className="p-8 space-y-6 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              {event.title}
            </h1>
            <div className="flex items-center justify-center space-x-4">
              <p className="text-lg text-gray-500 font-medium">
                {new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                {event.category}
              </span>
            </div>
            <p className="text-2xl font-bold text-purple-700">
              {event?.price ? `$${Number(event.price).toFixed(2)}` : 'Free'}
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              {event.description}
            </p>
            <div className="flex justify-center">
              <button
                    onClick={() => handleBooking(event._id, event.price)}
               className="mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:-translate-y-1">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;