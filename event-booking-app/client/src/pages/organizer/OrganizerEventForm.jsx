import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function OrganizerEventForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'music',
    date: '',
    location: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/events', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('Event submitted successfully!');
      setFormData({
        title: '',
        description: '',
        category: 'music',
        date: '',
        location: '',
        price: '',
      });
    } catch (error) {
      console.error('Submit Event Error:', error);
      toast.error('Failed to submit event');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">Submit New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          type="text"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="music">Music</option>
          <option value="sports">Sports</option>
          <option value="education">Education</option>
          <option value="business">Business</option>
        </select>
        <input
          name="date"
          type="datetime-local"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="location"
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="price"
          type="number"
          placeholder="Ticket Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Submit Event
        </button>
      </form>
    </div>
  );
}

export default OrganizerEventForm;
