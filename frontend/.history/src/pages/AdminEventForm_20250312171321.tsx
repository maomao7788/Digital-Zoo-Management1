// src/pages/AdminEventForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AdminEventForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [minTier, setMinTier] = useState('Basic');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // created_by 字段通常由后端根据当前登录用户自动绑定
      await api.post('events/', { title, description, event_date: eventDate, location, min_tier: minTier });
      setMessage('Event created successfully');
      navigate('/events');
    } catch (error) {
      setMessage('Event creation failed');
    }
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
        <input 
          type="datetime-local" 
          placeholder="Event Date" 
          value={eventDate} 
          onChange={(e) => setEventDate(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Location" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          required 
        />
        <select value={minTier} onChange={(e) => setMinTier(e.target.value)}>
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
