import React, { useEffect, useState } from "react";
import { getEvents, registerForEvent, submitFeedback } from "../services/api";
import { Container, Typography, Button, Card, CardContent } from "@mui/material";

const ManageEvents: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    getEvents().then((response) => {
      setEvents(response.data);
    });
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mb: 3 }}>
        Manage Events
      </Typography>

      {events.length === 0 ? (
        <Typography>No events available.</Typography>
      ) : (
        events.map((event) => (
          <Card key={event.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{event.title}</Typography>
              <Typography>{event.description}</Typography>
              <Typography>Location: {event.location}</Typography>
              <Typography>Minimum Tier: {event.min_tier}</Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 1 }}
                onClick={() => alert(`Managing Event: ${event.title}`)}
              >
                Manage Event
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default ManageEvents;
