
import React, { useEffect, useState } from 'react';
import { fetchEvents, applyForEvent } from '../services/api';

interface Event {
  id: number;
  title: string;
  description: string;
  event_date: string;
  location: string;
  participants: { id: number, username: string }[];
  registrations: any[];
}

const EventListPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const data = await fetchEvents();
    setEvents(data);
    setLoading(false);
  };

  const handleApply = async (eventId: number) => {
    // 申请参加活动
    await applyForEvent(eventId);
    loadEvents();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>可参加活动</h1>
      {events.map(event => (
        <div key={event.id} style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>时间：{new Date(event.event_date).toLocaleString()}</p>
          <p>地点：{event.location}</p>
          <p>参与者：{event.participants.map(p => p.username).join(", ")}</p>
          <button onClick={() => handleApply(event.id)}>申请参加</button>
        </div>
      ))}
    </div>
  );
};

export default EventListPage;
