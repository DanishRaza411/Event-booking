import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PendingEvents from '../../components/PendingEvents';
import DashboardLayout from '../../components/DashboardLayout';




function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editData, setEditData] = useState({ name: '', email: '', role: '' });

   

  // Fetch all users
  const fetchUsers = async () => {
    try {
     const admin = JSON.parse(localStorage.getItem('user'));
      const token = admin.token;
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (error) {
      console.error('Fetch users error:', error);
      toast.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const deleteUser = async (id) => {
    try {
       const admin = JSON.parse(localStorage.getItem('user'));
      const token = admin.token;
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('User deleted');
      fetchUsers();
    } catch (error) {
      console.error('Delete user error:', error);
      toast.error('Failed to delete user');
    }
  };

  // Begin editing user
  const handleEditClick = (user) => {
    setEditingUser(user._id);
    setEditData({ name: user.name, email: user.email, role: user.role });
  };

  // Save updated user
  const handleUpdateUser = async () => {
    try {
       const admin = JSON.parse(localStorage.getItem('user'));
      const token = admin.token;
      await axios.put(
        `http://localhost:5000/api/users/${editingUser}`,
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('User updated');
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Update user error:', error);
      toast.error('Failed to update user');
    }
  };

  return (
    <DashboardLayout role="admin">
    <PendingEvents />
    <div className="p-8 min-h-screen bg-gray-100">
    
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">User List</h1>

      <table className="w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-indigo-50 text-indigo-700">
          <tr>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Email</th>
            <th className="text-left p-3">Role</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            editingUser === user._id ? (
              <tr key={user._id} className="border-t">
                <td className="p-3">
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="border p-1 w-full"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="border p-1 w-full"
                  />
                </td>
                <td className="p-3">
                  <select
                    value={editData.role}
                    onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                    className="border p-1 w-full"
                  >
                    <option value="customer">Customer</option>
                    <option value="organizer">Organizer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-3 flex gap-2">
                  <button onClick={handleUpdateUser} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    Save
                  </button>
                  <button onClick={() => setEditingUser(null)} className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500">
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={user._id} className="border-t">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;
