import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import axios from 'axios';

interface SpecialEvent {
  id: number;
  title: string;
  description: string;
  event_date: string;
  location: string;
  min_tier: string;
  participants: { id: number; username: string }[];
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<SpecialEvent[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/zoo/api/events/")
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const applyForEvent = async (eventId: number) => {
    try {
      const response = await axios.post("http://localhost:8000/zoo/api/event-registrations/", 
        { event: eventId },
        { withCredentials: true }
      );
      setMessage("Event application submitted!");
    } catch (error: any) {
      console.error("Error applying for event:", error.response?.data || error.message);
      setMessage("Failed to apply for event. Please try again.");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Event List</Typography>
      {message && <Typography color="error">{message}</Typography>}
      {events.map((event) => (
        <Card key={event.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5">{event.title}</Typography>
            <Typography>{event.description}</Typography>
            <Typography>Date: {new Date(event.event_date).toLocaleString()}</Typography>
            <Typography>Location: {event.location}</Typography>
            <Typography>Minimum Tier: {event.min_tier}</Typography>
            <Typography>
              Participants: {event.participants.map(p => p.username).join(", ")}
            </Typography>
            <Button variant="contained" sx={{ mt: 1 }} onClick={() => applyForEvent(event.id)}>
              Apply to Participate
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default EventList;