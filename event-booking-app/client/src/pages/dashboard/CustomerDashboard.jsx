import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { motion } from 'framer-motion';

function CustomerDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = user.token;
    axios.get('http://localhost:5000/api/bookings/my-bookings', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setBookings(res.data);
    }).catch((err) => {
      console.error('Failed to fetch bookings:', err);
    });
  }, []);

  const totalBookings = bookings.length;
  const totalSpent = bookings.reduce((sum, b) => sum + (b.event?.price || 0) * b.quantity, 0);
  const upcomingEvents = bookings.filter(b => new Date(b.event?.date) > new Date()).length;

  return (
    <DashboardLayout role="customer">
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-gray-50 to-blue-50 p-6 sm:p-8 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-800 tracking-tight">
            Welcome, {user?.name || 'Customer'}!
          </h1>
          <p className="mt-3 text-lg text-gray-600 font-medium">
            Your event summary at a glance
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="Total Bookings"
              value={totalBookings}
              icon="🎫"
              color="indigo"
              onClick={() => navigate('/customer/bookings')}
            />
            <DashboardCard
              title="Upcoming Events"
              value={upcomingEvents}
              icon="📅"
              color="blue"
            />
            <DashboardCard
              title="Total Spent"
              value={`$${totalSpent.toFixed(2)}`}
              icon="💰"
              color="teal"
            />
          </div>

          {bookings.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12 bg-white rounded-2xl shadow-lg p-6 sm:p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Bookings</h2>
              <div className="space-y-4">
                {bookings.slice(0, 3).map((booking) => (
                  <motion.div
                    key={booking._id}
                    whileHover={{ scale: 1.02 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors"
                  >
                    <div className="mb-3 sm:mb-0">
                      <p className="text-gray-800 font-semibold">{booking.event?.title || 'Unknown Event'}</p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Date:</span>{' '}
                        {new Date(booking.event?.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Quantity:</span> {booking.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-indigo-600">
                      ${(booking.event?.price || 0) * booking.quantity}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

function DashboardCard({ title, value, icon, color, onClick }) {
  const colorStyles = {
    indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200 hover:border-indigo-400',
    blue: 'bg-blue-100 text-blue-600 border-blue-200 hover:border-blue-400',
    teal: 'bg-teal-100 text-teal-600 border-teal-200 hover:border-teal-400',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`bg-white p-6 rounded-2xl shadow-lg border ${colorStyles[color]} transition-all duration-300 cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div className="text-4xl">{icon}</div>
        <div>
          <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
          <p className="text-3xl font-bold">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default CustomerDashboard;
