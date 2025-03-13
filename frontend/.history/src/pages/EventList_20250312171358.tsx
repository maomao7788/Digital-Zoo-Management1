import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

interface Event {
  id: number;
  title: string;
  description: string;
  event_date: string;
  location: string;
  min_tier: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    API.get('/events/').then(response => {
      setEvents(response.data);
    }).catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Events</h2>
      {events.map(event => (
        <div key={event.id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>Date: {event.event_date}</p>
          <p>Location: {event.location}</p>
          <Link to={`/events/${event.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default EventList;