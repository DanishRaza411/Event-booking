// src/pages/admin/AdminEvents.jsx
import { useEffect, useState } from 'react';
import api from '../../services/api';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/events');
        setEvents(res.data);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    const confirm = window.confirm('Are you sure you want to delete this event?');
    if (!confirm) return;

    try {
      await api.delete(`/events/${eventId}`);
      setEvents((prev) => prev.filter((event) => event._id !== eventId));
    } catch (err) {
      console.error('Failed to delete event:', err);
      alert('Failed to delete event.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-800">All Events</h2>
      {loading ? (
        <p className="text-gray-600">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-gray-600">No events found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow bg-white p-4">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-blue-100 text-blue-800 font-semibold">
              <tr>
                <th className="py-2 px-4">#</th>
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Location</th>
                <th className="py-2 px-4">Organizer</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={event._id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{event.title}</td>
                  <td className="py-2 px-4">{new Date(event.date).toLocaleString()}</td>
                  <td className="py-2 px-4">{event.location}</td>
                  <td className="py-2 px-4">{event.organizer?.name || 'Unknown'}</td>
                  <td className="py-2 px-4 capitalize">{event.status}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Events;
