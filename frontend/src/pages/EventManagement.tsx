import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
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

interface Registration {
  id: number;
  event: number;
  user: { id: number; username: string };
  status: string;
}

const EventManagement: React.FC = () => {
  const [events, setEvents] = useState<SpecialEvent[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [message, setMessage] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<SpecialEvent | null>(null);
  const [editingEvent, setEditingEvent] = useState<Partial<SpecialEvent>>({});

  // 全局加载所有活动
  const fetchEvents = () => {
    axios.get("http://localhost:8000/zoo/api/events/")
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => console.error("Error fetching events:", error));
  };

  // 全局加载所有报名请求（建议后端接口根据当前用户过滤数据）
  const fetchRegistrations = () => {
    axios.get("http://localhost:8000/zoo/api/event-registrations/")
      .then(response => {
        setRegistrations(response.data);
      })
      .catch(error => console.error("Error fetching registrations:", error));
  };

  useEffect(() => {
    fetchEvents();
    fetchRegistrations();
  }, []);

  // 更新报名状态，调用自定义 endpoint（POST 到 /registrations/{id}/update_status/）
  const updateRegistrationStatus = async (reg: Registration, newStatus: string) => {
    try {
      await axios.post(
        `http://localhost:8000/zoo/api/registrations/${reg.id}/update_status/`,
        { status: newStatus },
        { withCredentials: true }
      );
      setMessage("Registration updated.");
      // 刷新报名数据及活动数据（例如参与人数可能变化）
      fetchRegistrations();
      fetchEvents();
    } catch (error: any) {
      console.error("Error updating registration:", error.response?.data || error.message);
      setMessage("Failed to update registration.");
    }
  };

  // 修改后的更新活动方法（建议使用 PUT 更新活动数据，如后端未定义 custom endpoint，则调用默认的更新接口）
  const updateEvent = async () => {
    if (!selectedEvent) return;
    try {
      await axios.put(
        `http://localhost:8000/zoo/api/events/${selectedEvent.id}/`,
        editingEvent,
        { withCredentials: true }
      );
      setMessage("Event updated.");
      fetchEvents();
    } catch (error: any) {
      console.error("Error updating event:", error.response?.data || error.message);
      setMessage("Failed to update event.");
    }
  };

  // 当选中某个活动时，过滤出该活动的所有报名请求
  const filteredRegistrations = selectedEvent
    ? registrations.filter(reg => reg.event === selectedEvent.id)
    : [];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Event Management</Typography>
      {message && <Typography color="error">{message}</Typography>}
      
      <Typography variant="h5" gutterBottom>All Events</Typography>
      {events.map((event) => (
        <Card key={event.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5">{event.title}</Typography>
            <Typography>{event.description}</Typography>
            <Typography>Date: {new Date(event.event_date).toLocaleString()}</Typography>
            <Typography>Location: {event.location}</Typography>
            <Typography>Minimum Tier: {event.min_tier}</Typography>
            <Typography>
              Participants: {event.participants.map(p => p.username).join(", ") || "None"}
            </Typography>
            <Button
              variant="outlined"
              sx={{ mt: 1 }}
              onClick={() => {
                setSelectedEvent(event);
                setEditingEvent(event);
              }}
            >
              Edit & View Registrations
            </Button>
          </CardContent>
        </Card>
      ))}

      {selectedEvent && (
        <Box sx={{ mb: 3, border: '1px solid #ccc', p: 2 }}>
          <Typography variant="h6">Edit Event</Typography>
          <TextField 
            label="Title" 
            value={editingEvent.title || ''} 
            onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})} 
            fullWidth sx={{ mb: 2 }} 
          />
          <TextField 
            label="Description" 
            value={editingEvent.description || ''} 
            onChange={(e) => setEditingEvent({...editingEvent, description: e.target.value})} 
            fullWidth sx={{ mb: 2 }} 
          />
          <TextField 
            label="Location" 
            value={editingEvent.location || ''} 
            onChange={(e) => setEditingEvent({...editingEvent, location: e.target.value})} 
            fullWidth sx={{ mb: 2 }} 
          />
          <TextField 
            label="Event Date" 
            type="datetime-local" 
            value={editingEvent.event_date ? editingEvent.event_date.slice(0,16) : ''} 
            onChange={(e) => setEditingEvent({...editingEvent, event_date: e.target.value})} 
            fullWidth sx={{ mb: 2 }} 
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="min-tier-label">Minimum Tier</InputLabel>
            <Select
              labelId="min-tier-label"
              value={editingEvent.min_tier || ''}
              label="Minimum Tier"
              onChange={(e) => setEditingEvent({...editingEvent, min_tier: e.target.value})}
            >
              <MenuItem value="Basic">Basic</MenuItem>
              <MenuItem value="Premium">Premium</MenuItem>
              <MenuItem value="VIP">VIP</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={updateEvent}>Update Event</Button>
          <Button variant="outlined" onClick={() => { setSelectedEvent(null); setEditingEvent({}); }} sx={{ ml: 2 }}>
            Cancel
          </Button>
        </Box>
      )}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          {selectedEvent ? `Registration Requests for "${selectedEvent.title}"` : "Select an event to view registration requests"}
        </Typography>
        {selectedEvent && filteredRegistrations.length === 0 && (
          <Typography>No registration requests for this event.</Typography>
        )}
        {filteredRegistrations.map((reg) => (
          <Card key={reg.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">
                User: {reg.user.username}
              </Typography>
              <Typography>Status: {reg.status}</Typography>
              <FormControl fullWidth sx={{ mb: 1 }}>
                <InputLabel id={`status-label-${reg.id}`}>Status</InputLabel>
                <Select
                  labelId={`status-label-${reg.id}`}
                  value={reg.status}
                  label="Status"
                  onChange={(e) => updateRegistrationStatus(reg, e.target.value)}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default EventManagement;
