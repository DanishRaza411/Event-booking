// src/components/DashboardLayout.jsx
import { Link } from 'react-router-dom';

const DashboardLayout = ({ children, role }) => {
  const navItems = {
    admin: [
      { name: 'Overview', path: '/admin/dashboard' },
      { name: 'Users', path: '/admin/users' },
      { name: 'Events', path: '/admin/events' },
    ],
    organizer: [
      { name: 'Dashboard', path: '/organizer/dashboard' },
      { name: 'My Events', path: '/dashboard/organizer/events' },
      { name: 'Create Event', path: '/organizer/submit-event' },
    ],
    customer: [
      { name: 'Dashboard', path: '/customer/dashboard' },
      { name: 'My Tickets', path: '/customer/tickets' },
      { name: 'Browse Events', path: '/events' },
    ],
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          {role.charAt(0).toUpperCase() + role.slice(1)} Panel
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {navItems[role]?.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-white hover:bg-gray-700 px-3 py-2 rounded"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
