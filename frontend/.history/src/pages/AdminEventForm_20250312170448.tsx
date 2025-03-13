import React, { useState } from 'react';
import API from '../api';
import { useHistory } from 'react-router-dom';

const AdminEventForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [minTier, setMinTier] = useState('Basic');
  const history = useHistory();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // created_by 字段在后端作为外键，这里简单传 1（实际应使用当前登录的 admin 用户 id）
      await API.post('/admin/events/', { title, description, event_date: eventDate, location, min_tier: minTier, created_by: 1 });
      setMessage('Event created successfully');
      history.push('/admin/events');
    } catch (error) {
      setMessage('Event creation failed');
    }
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <input type="datetime-local" placeholder="Event Date" value={eventDate} onChange={e => setEventDate(e.target.value)} required />
        <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required />
        <select value={minTier} onChange={e => setMinTier(e.target.value)}>
          <option value="Basic">Basic</option>
          <option value="Premium">Premium</option>
          <option value="VIP">VIP</option>
        </select>
        <button type="submit">Create Event</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminEventForm;