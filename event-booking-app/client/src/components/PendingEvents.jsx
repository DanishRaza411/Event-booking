import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function PendingEvents() {
  const [pendingEvents, setPendingEvents] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;

  const fetchPendingEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events/pending', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingEvents(res.data);
    } catch (error) {
      console.error('Error fetching pending events:', error);
      toast.error('Failed to fetch pending events');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/events/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`Event ${status}`);
      fetchPendingEvents(); // Refresh list
    } catch (error) {
      console.error('Error updating event status:', error);
      toast.error('Failed to update event status');
    }
  };

  useEffect(() => {
    fetchPendingEvents();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Pending Events</h2>
      {pendingEvents.length === 0 ? (
        <p>No pending events.</p>
      ) : (
        <ul className="space-y-4">
          {pendingEvents.map((event) => (
            <li key={event._id} className="border p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold">{event.title}</h3>
              <p className="text-sm text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600">Organizer: {event.createdBy?.name}</p>
              <p className="text-sm text-gray-600">Status: {event.status}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleStatusChange(event._id, 'approved')}
                  className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange(event._id, 'rejected')}
                  className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PendingEvents;
