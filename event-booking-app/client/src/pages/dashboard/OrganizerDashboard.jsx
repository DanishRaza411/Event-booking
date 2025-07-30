import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import api from '../../services/api'; // Adjust the import based on your project structure
import DashboardLayout from '../../components/DashboardLayout';
import { Link } from 'react-router-dom'; // Add this at the top


function OrganizerDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [events, setEvents] = useState([]);
  const [totalAttendees, setTotalAttendees] = useState(0);
const [earnings, setEarnings] = useState(0);


  // Fetch events created by the current organizer
  const fetchMyEvents = async () => {
    try {
      const token = user.token;
      const res = await axios.get('http://localhost:5000/api/events/my-events', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(res.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
 
  useEffect(() => {
    fetchMyEvents();
  }, []);

   useEffect(() => {
  const fetchStats = async () => {
  try {
    const token = user.token;
   const res = await axios.get('http://localhost:5000/api/bookings/organizer-bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    const bookings = res.data;
    const attendees = bookings.length;
    const totalEarnings = bookings.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);


    setTotalAttendees(attendees);
    setEarnings(totalEarnings);
  } catch (err) {
    console.error('Failed to fetch organizer stats:', err);
  }
};


  fetchStats();
}, []);

  return (
    <DashboardLayout role="organizer">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600">
            Organizer Dashboard
          </h1>
          <p className="mt-2 text-lg text-gray-600 font-medium">
            Welcome, {user?.name || 'Organizer'}!
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
<Link to="/dashboard/organizer/events">
  <DashboardCard title="My Events" value={events.length} icon="📍" />
</Link>
            <DashboardCard title="Total Attendees" value={totalAttendees} icon="👥" />
            <DashboardCard title="Earnings" value={`$${earnings.toLocaleString()}`} icon="💵" />

          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="relative bg-white p-6 rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:border-green-200 transition-all duration-300"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-50 to-teal-50 rounded-bl-full opacity-50" />
      <div className="flex items-center space-x-4">
        <div className="text-3xl">{icon}</div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-3xl font-bold text-green-600 mt-1">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default OrganizerDashboard;
