import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from '../../components/DashboardLayout';

function OrganizerEvents() {
  const [events, setEvents] = useState([]);

  const fetchMyEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events/my-events', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEvents(res.data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  return (
    <DashboardLayout role="organizer">
      <div className="min-h-screen bg-gray-50 p-6 sm:p-8 lg:p-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 mb-8 tracking-tight">
            My Submitted Events
          </h2>
          {events.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <p className="text-gray-500 text-lg">No events submitted yet.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map(event => (
                <div
                  key={event._id}
                  className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
                >
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{event.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{event.category}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Date:</span>{' '}
                    {new Date(event.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Location:</span> {event.location}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default OrganizerEvents;