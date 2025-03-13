// src/pages/EventDetail.tsx
import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useParams } from 'react-router-dom';

interface Event {
  id: number;
  title: string;
  description: string;
  event_date: string;
  location: string;
  min_tier: string;
}

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      const eventId = parseInt(id, 10);
      API.get('/events/')
        .then(response => {
          const events = response.data as Event[];
          const currentEvent = events.find((e: Event) => e.id === eventId);
          setEvent(currentEvent || null);
        })
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleRegister = async () => {
    if (!id) return;
    try {
      await API.post(`/events/${id}/register/`);
      setMessage('Successfully registered for event');
    } catch (error) {
      setMessage('Registration failed');
    }
  };

  return (
    <div>
      {event ? (
        <div>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>Date: {event.event_date}</p>
          <p>Location: {event.location}</p>
          <button onClick={handleRegister}>Register for Event</button>
          {message && <p>{message}</p>}
        </div>
      ) : (
        <p>Loading event...</p>
      )}
    </div>
  );
};

export default EventDetail;
