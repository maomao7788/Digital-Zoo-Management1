import React, { useEffect, useState } from 'react';
import { getEvents, applyEventRegistration, submitFeedback } from '../services/api';
import FeedbackSection from './FeedbackSection';

interface User {
  id: number;
  username: string;
}

interface Registration {
  id: number;
  user: User;
  status: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  event_date: string;
  location: string;
  participants: User[];
  registrations: Registration[];
}

const EventListPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Assume current user information is stored (can be retrieved from context or global state)
  const currentUser: User = { id: 1, username: 'current_user' };

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to load events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (eventId: number) => {
    try {
      await applyEventRegistration({ event: eventId });
      // Reload event list to update status
      loadEvents();
    } catch (error) {
      console.error("Failed to apply for event:", error);
    }
  };

  // Check if the current user is registered and approved
  const isApproved = (registrations: Registration[]) => {
    return registrations.some(reg => reg.user.username === currentUser.username && reg.status === "Approved");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Available Events</h1>
      {events.map(event => (
        <div key={event.id} style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>Date: {new Date(event.event_date).toLocaleString()}</p>
          <p>Location: {event.location}</p>
          <p>Participants: {event.participants.map(p => p.username).join(", ") || "None"}</p>
          
          {/* Show "Apply" button if the user has not registered or is not approved */}
          {!isApproved(event.registrations) && (
            <button onClick={() => handleApply(event.id)}>Apply</button>
          )}

          {/* Show feedback section if the user is approved */}
          {isApproved(event.registrations) && (
            <FeedbackSection eventId={event.id} onFeedbackSubmitted={loadEvents} />
          )}
        </div>
      ))}
    </div>
  );
};

export default EventListPage;