import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoute from '../components/PrivateRoute';

import AdminDashboard from '../pages/dashboard/AdminDashboard';
import OrganizerDashboard from '..//pages/dashboard/OrganizerDashboard';
import CustomerDashboard from '../pages/dashboard/CustomerDashboard';
import OrganizerEventForm from '../pages/organizer/OrganizerEventForm';
import OrganizerEvents from '../pages/organizer/OrganizerEvents';
import BrowseEvents from '../components/BrowseEvents';

import CustomerBookings from '../pages/Customer/CustomerBookings';

import AdminUsers from '../pages/Admin/Users';
import AdminEvents from '../pages/Admin/Events';

import EventDetails from '../components/EventDetails';




function Routess() {
  return (
    <Router>
      <Routes>

      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* login and register */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
 
      {/* Protected Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/organizer/dashboard"
        element={
          <PrivateRoute allowedRoles={['organizer']}>
            <OrganizerDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/customer/dashboard"
        element={
          <PrivateRoute allowedRoles={['customer']}>
            <CustomerDashboard />
          </PrivateRoute>
        }
      />

      // event details
      <Route path="/events" element={<BrowseEvents />} />
      <Route path="/events/:eventId" element={<EventDetails />} />

      // organizer routes
      <Route path="/organizer/submit-event" element={<OrganizerEventForm />} />
      <Route path="/dashboard/organizer/events" element={<OrganizerEvents />} />

      // customer bookings
      <Route path="/customer/bookings" element={<CustomerBookings />} />


      // admin events and user router
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/events" element={<AdminEvents />} />

      {/* Optional fallback */}
      <Route path="*" element={<div>404 Not Found</div>} />
      <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />

    </Routes>
    </Router>
  );
}

export default Routess;
