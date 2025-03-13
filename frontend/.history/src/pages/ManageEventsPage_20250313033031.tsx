// // src/components/ManageEventsPage.tsx
// import React, { useEffect, useState } from 'react';
// import { getEvents, createEvent, updateEvent, deleteEvent, updateEventRegistrationStatus } from '../services/api';

// interface User {
//   id: number;
//   username: string;
// }

// interface Registration {
//   id: number;
//   user: User;
//   status: string;
// }

// interface Event {
//   id: number;
//   title: string;
//   description: string;
//   event_date: string;
//   location: string;
//   min_tier: string;
//   participants: User[];
//   registrations: Registration[];
//   created_by?: User;
// }

// const ManageEventsPage: React.FC = () => {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [editingEvent, setEditingEvent] = useState<Event | null>(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     event_date: '',
//     location: '',
//     min_tier: '',
//   });

//   // 假设当前用户信息，例如：当前用户名为 "admin"
//   const currentUser = { username: 'admin' };

//   useEffect(() => {
//     loadEvents();
//   }, []);

//   const loadEvents = async () => {
//     try {
//       const response = await getEvents();
//       // 仅显示当前用户创建的活动
//       const filtered = response.data.filter((e: Event) => e.created_by?.username === currentUser.username);
//       setEvents(filtered);
//     } catch (error) {
//       console.error("加载活动失败:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (editingEvent) {
//         await updateEvent(editingEvent.id, formData);
//       } else {
//         await createEvent(formData);
//       }
//       setFormData({ title: '', description: '', event_date: '', location: '', min_tier: '' });
//       setEditingEvent(null);
//       loadEvents();
//     } catch (error) {
//       console.error("提交活动失败:", error);
//     }
//   };

//   const handleEdit = (event: Event) => {
//     setEditingEvent(event);
//     setFormData({
//       title: event.title,
//       description: event.description,
//       event_date: event.event_date,
//       location: event.location,
//       min_tier: event.min_tier,
//     });
//   };

//   const handleDelete = async (eventId: number) => {
//     try {
//       await deleteEvent(eventId);
//       loadEvents();
//     } catch (error) {
//       console.error("删除活动失败:", error);
//     }
//   };

//   const handleUpdateRegistration = async (registrationId: number, status: string) => {
//     try {
//       await updateEventRegistrationStatus(registrationId, status);
//       loadEvents();
//     } catch (error) {
//       console.error("更新报名状态失败:", error);
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>管理您的活动</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="title"
//           value={formData.title}
//           onChange={handleInputChange}
//           placeholder="标题"
//           required
//         />
//         <br />
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleInputChange}
//           placeholder="描述"
//           required
//         />
//         <br />
//         <input
//           name="event_date"
//           type="datetime-local"
//           value={formData.event_date}
//           onChange={handleInputChange}
//           required
//         />
//         <br />
//         <input
//           name="location"
//           value={formData.location}
//           onChange={handleInputChange}
//           placeholder="地点"
//           required
//         />
//         <br />
//         <input
//           name="min_tier"
//           value={formData.min_tier}
//           onChange={handleInputChange}
//           placeholder="最低会员等级"
//           required
//         />
//         <br />
//         <button type="submit">{editingEvent ? "更新活动" : "创建活动"}</button>
//       </form>

//       <h2>您的活动</h2>
//       {events.map(event => (
//         <div key={event.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
//           <h3>{event.title}</h3>
//           <p>{event.description}</p>
//           <p>时间：{new Date(event.event_date).toLocaleString()}</p>
//           <p>地点：{event.location}</p>
//           <p>参与者：{event.participants.map(p => p.username).join(", ") || "暂无"}</p>
//           <button onClick={() => handleEdit(event)}>编辑</button>
//           <button onClick={() => handleDelete(event.id)}>删除</button>
//           <h4>报名记录：</h4>
//           {event.registrations.map(reg => (
//             <div key={reg.id}>
//               <span>
//                 {reg.user.username} - {reg.status}
//               </span>
//               {reg.status === "Pending" && (
//                 <>
//                   <button onClick={() => handleUpdateRegistration(reg.id, "Approved")}>批准</button>
//                   <button onClick={() => handleUpdateRegistration(reg.id, "Rejected")}>拒绝</button>
//                 </>
//               )}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ManageEventsPage;
// src/components/ManageEventsPage.tsx
// import React, { useEffect, useState } from 'react';
// import { getEvents, createEvent, updateEvent, deleteEvent, updateEventRegistrationStatus } from '../services/api';

// interface User {
//   id: number;
//   username: string;
// }

// interface Registration {
//   id: number;
//   user: User;
//   status: string;
// }

// interface Event {
//   id: number;
//   title: string;
//   description: string;
//   event_date: string;
//   location: string;
//   min_tier: string;
//   participants: User[];
//   registrations: Registration[];
//   created_by?: User;
// }

// const ManageEventsPage: React.FC = () => {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [editingEvent, setEditingEvent] = useState<Event | null>(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     event_date: '',
//     location: '',
//     min_tier: '',
//   });

//   // Assume current user information, for example: current username is "admin"
//   const currentUser = { username: 'admin' };

//   useEffect(() => {
//     loadEvents();
//   }, []);

//   const loadEvents = async () => {
//     try {
//       const response = await getEvents();
//       // Only display events created by the current user
//       const filtered = response.data.filter((e: Event) => e.created_by?.username === currentUser.username);
//       setEvents(filtered);
//     } catch (error) {
//       console.error("Error loading events:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (editingEvent) {
//         await updateEvent(editingEvent.id, formData);
//       } else {
//         await createEvent(formData);
//       }
//       setFormData({ title: '', description: '', event_date: '', location: '', min_tier: '' });
//       setEditingEvent(null);
//       loadEvents();
//     } catch (error) {
//       console.error("Error submitting event:", error);
//     }
//   };

//   const handleEdit = (event: Event) => {
//     setEditingEvent(event);
//     setFormData({
//       title: event.title,
//       description: event.description,
//       event_date: event.event_date,
//       location: event.location,
//       min_tier: event.min_tier,
//     });
//   };

//   const handleDelete = async (eventId: number) => {
//     try {
//       await deleteEvent(eventId);
//       loadEvents();
//     } catch (error) {
//       console.error("Error deleting event:", error);
//     }
//   };

//   const handleUpdateRegistration = async (registrationId: number, status: string) => {
//     try {
//       await updateEventRegistrationStatus(registrationId, status);
//       loadEvents();
//     } catch (error) {
//       console.error("Error updating registration status:", error);
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>Manage Your Events</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="title"
//           value={formData.title}
//           onChange={handleInputChange}
//           placeholder="Title"
//           required
//         />
//         <br />
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleInputChange}
//           placeholder="Description"
//           required
//         />
//         <br />
//         <input
//           name="event_date"
//           type="datetime-local"
//           value={formData.event_date}
//           onChange={handleInputChange}
//           required
//         />
//         <br />
//         <input
//           name="location"
//           value={formData.location}
//           onChange={handleInputChange}
//           placeholder="Location"
//           required
//         />
//         <br />
//         <input
//           name="min_tier"
//           value={formData.min_tier}
//           onChange={handleInputChange}
//           placeholder="Minimum Membership Tier"
//           required
//         />
//         <br />
//         <button type="submit">{editingEvent ? "Update Event" : "Create Event"}</button>
//       </form>

//       <h2>Your Events</h2>
//       {events.map(event => (
//         <div key={event.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
//           <h3>{event.title}</h3>
//           <p>{event.description}</p>
//           <p>Date: {new Date(event.event_date).toLocaleString()}</p>
//           <p>Location: {event.location}</p>
//           <p>Minimum Membership Tier: {event.min_tier}</p>
//           <p>Participants: {event.participants.map(p => p.username).join(", ") || "None"}</p>
//           <button onClick={() => handleEdit(event)}>Edit</button>
//           <button onClick={() => handleDelete(event.id)}>Delete</button>
//           <h4>Registration Requests:</h4>
//           {event.registrations.map(reg => (
//             <div key={reg.id}>
//               <span>
//                 {reg.user.username} - {reg.status}
//               </span>
//               {reg.status === "Pending" && (
//                 <>
//                   <button onClick={() => handleUpdateRegistration(reg.id, "Approved")}>Approve</button>
//                   <button onClick={() => handleUpdateRegistration(reg.id, "Rejected")}>Reject</button>
//                 </>
//               )}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ManageEventsPage;


// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel
// } from '@mui/material';
// import axios from 'axios';

// interface SpecialEvent {
//   id: number;
//   title: string;
//   description: string;
//   event_date: string;
//   location: string;
//   min_tier: string;
//   participants: { id: number; username: string }[];
// }

// interface Registration {
//   id: number;
//   event: number;
//   user: { id: number; username: string };
//   status: string;
// }

// const EventManagement: React.FC = () => {
//   const [events, setEvents] = useState<SpecialEvent[]>([]);
//   const [registrations, setRegistrations] = useState<Registration[]>([]);
//   const [message, setMessage] = useState("");
//   const [selectedEvent, setSelectedEvent] = useState<SpecialEvent | null>(null);
//   const [editingEvent, setEditingEvent] = useState<Partial<SpecialEvent>>({});

//   // 全局加载所有活动
//   const fetchEvents = () => {
//     axios.get("http://localhost:8000/zoo/api/events/")
//       .then(response => {
//         setEvents(response.data);
//       })
//       .catch(error => console.error("Error fetching events:", error));
//   };

//   // 全局加载所有报名请求（建议后端接口根据当前用户过滤数据）
//   const fetchRegistrations = () => {
//     axios.get("http://localhost:8000/zoo/api/event-registrations/")
//       .then(response => {
//         setRegistrations(response.data);
//       })
//       .catch(error => console.error("Error fetching registrations:", error));
//   };

//   useEffect(() => {
//     fetchEvents();
//     fetchRegistrations();
//   }, []);

//   // 更新报名状态，调用自定义 endpoint（POST 到 /registrations/{id}/update_status/）
//   const updateRegistrationStatus = async (reg: Registration, newStatus: string) => {
//     try {
//       await axios.post(
//         `http://localhost:8000/zoo/api/registrations/${reg.id}/update_status/`,
//         { status: newStatus },
//         { withCredentials: true }
//       );
//       setMessage("Registration updated.");
//       // 刷新报名数据及活动数据（例如参与人数可能变化）
//       fetchRegistrations();
//       fetchEvents();
//     } catch (error: any) {
//       console.error("Error updating registration:", error.response?.data || error.message);
//       setMessage("Failed to update registration.");
//     }
//   };

//   // 修改后的更新活动方法（建议使用 PUT 更新活动数据，如后端未定义 custom endpoint，则调用默认的更新接口）
//   const updateEvent = async () => {
//     if (!selectedEvent) return;
//     try {
//       await axios.put(
//         `http://localhost:8000/zoo/api/events/${selectedEvent.id}/`,
//         editingEvent,
//         { withCredentials: true }
//       );
//       setMessage("Event updated.");
//       fetchEvents();
//     } catch (error: any) {
//       console.error("Error updating event:", error.response?.data || error.message);
//       setMessage("Failed to update event.");
//     }
//   };

//   // 当选中某个活动时，过滤出该活动的所有报名请求
//   const filteredRegistrations = selectedEvent
//     ? registrations.filter(reg => reg.event === selectedEvent.id)
//     : [];

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom>Event Management</Typography>
//       {message && <Typography color="error">{message}</Typography>}
      
//       <Typography variant="h5" gutterBottom>All Events</Typography>
//       {events.map((event) => (
//         <Card key={event.id} sx={{ mb: 2 }}>
//           <CardContent>
//             <Typography variant="h5">{event.title}</Typography>
//             <Typography>{event.description}</Typography>
//             <Typography>Date: {new Date(event.event_date).toLocaleString()}</Typography>
//             <Typography>Location: {event.location}</Typography>
//             <Typography>Minimum Tier: {event.min_tier}</Typography>
//             <Typography>
//               Participants: {event.participants.map(p => p.username).join(", ") || "None"}
//             </Typography>
//             <Button
//               variant="outlined"
//               sx={{ mt: 1 }}
//               onClick={() => {
//                 setSelectedEvent(event);
//                 setEditingEvent(event);
//               }}
//             >
//               Edit & View Registrations
//             </Button>
//           </CardContent>
//         </Card>
//       ))}

//       {selectedEvent && (
//         <Box sx={{ mb: 3, border: '1px solid #ccc', p: 2 }}>
//           <Typography variant="h6">Edit Event</Typography>
//           <TextField 
//             label="Title" 
//             value={editingEvent.title || ''} 
//             onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})} 
//             fullWidth sx={{ mb: 2 }} 
//           />
//           <TextField 
//             label="Description" 
//             value={editingEvent.description || ''} 
//             onChange={(e) => setEditingEvent({...editingEvent, description: e.target.value})} 
//             fullWidth sx={{ mb: 2 }} 
//           />
//           <TextField 
//             label="Location" 
//             value={editingEvent.location || ''} 
//             onChange={(e) => setEditingEvent({...editingEvent, location: e.target.value})} 
//             fullWidth sx={{ mb: 2 }} 
//           />
//           <TextField 
//             label="Event Date" 
//             type="datetime-local" 
//             value={editingEvent.event_date ? editingEvent.event_date.slice(0,16) : ''} 
//             onChange={(e) => setEditingEvent({...editingEvent, event_date: e.target.value})} 
//             fullWidth sx={{ mb: 2 }} 
//           />
//           <FormControl fullWidth sx={{ mb: 2 }}>
//             <InputLabel id="min-tier-label">Minimum Tier</InputLabel>
//             <Select
//               labelId="min-tier-label"
//               value={editingEvent.min_tier || ''}
//               label="Minimum Tier"
//               onChange={(e) => setEditingEvent({...editingEvent, min_tier: e.target.value})}
//             >
//               <MenuItem value="Basic">Basic</MenuItem>
//               <MenuItem value="Premium">Premium</MenuItem>
//               <MenuItem value="VIP">VIP</MenuItem>
//             </Select>
//           </FormControl>
//           <Button variant="contained" onClick={updateEvent}>Update Event</Button>
//           <Button variant="outlined" onClick={() => { setSelectedEvent(null); setEditingEvent({}); }} sx={{ ml: 2 }}>
//             Cancel
//           </Button>
//         </Box>
//       )}

//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h5" gutterBottom>
//           {selectedEvent ? `Registration Requests for "${selectedEvent.title}"` : "Select an event to view registration requests"}
//         </Typography>
//         {selectedEvent && filteredRegistrations.length === 0 && (
//           <Typography>No registration requests for this event.</Typography>
//         )}
//         {filteredRegistrations.map((reg) => (
//           <Card key={reg.id} sx={{ mb: 2 }}>
//             <CardContent>
//               <Typography variant="h6">
//                 User: {reg.user.username}
//               </Typography>
//               <Typography>Status: {reg.status}</Typography>
//               <FormControl fullWidth sx={{ mb: 1 }}>
//                 <InputLabel id={`status-label-${reg.id}`}>Status</InputLabel>
//                 <Select
//                   labelId={`status-label-${reg.id}`}
//                   value={reg.status}
//                   label="Status"
//                   onChange={(e) => updateRegistrationStatus(reg, e.target.value)}
//                 >
//                   <MenuItem value="Pending">Pending</MenuItem>
//                   <MenuItem value="Approved">Approved</MenuItem>
//                   <MenuItem value="Rejected">Rejected</MenuItem>
//                 </Select>
//               </FormControl>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default EventManagement;

// src/components/EventManagement.tsx
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
  registrations: Registration[];
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
  // When an event is selected, the form is in editing mode.
  // If null, the form works as a "Create New Event" form.
  const [selectedEvent, setSelectedEvent] = useState<SpecialEvent | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    location: '',
    min_tier: '',
  });

  // Global functions to load events and registrations.
  const fetchEvents = () => {
    axios.get("http://localhost:8000/zoo/api/events/")
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => console.error("Error fetching events:", error));
  };

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

  // Update registration status using the custom endpoint.
  const updateRegistrationStatus = async (reg: Registration, newStatus: string) => {
    try {
      await axios.post(
        `http://localhost:8000/zoo/api/registrations/${reg.id}/update_status/`,
        { status: newStatus },
        { withCredentials: true }
      );
      setMessage("Registration updated.");
      // Refresh both registrations and events (to update participant lists)
      fetchRegistrations();
      fetchEvents();
    } catch (error: any) {
      console.error("Error updating registration:", error.response?.data || error.message);
      setMessage("Failed to update registration.");
    }
  };

  // Handle creation and update of an event.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedEvent) {
        // Editing mode: update event.
        await axios.put(
          `http://localhost:8000/zoo/api/events/${selectedEvent.id}/`,
          formData,
          { withCredentials: true }
        );
        setMessage("Event updated.");
      } else {
        // Creation mode: create event.
        await axios.post(
          "http://localhost:8000/zoo/api/events/",
          formData,
          { withCredentials: true }
        );
        setMessage("Event created.");
      }
      // Reset form and refresh events list.
      setFormData({ title: '', description: '', event_date: '', location: '', min_tier: '' });
      setSelectedEvent(null);
      fetchEvents();
    } catch (error: any) {
      console.error("Error submitting event:", error.response?.data || error.message);
      setMessage("Failed to submit event.");
    }
  };

  // When clicking "Edit & View Registrations", load the event data into the form.
  const handleEdit = (event: SpecialEvent) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      event_date: event.event_date,
      location: event.location,
      min_tier: event.min_tier,
    });
  };

  const handleDelete = async (eventId: number) => {
    try {
      await axios.delete(`http://localhost:8000/zoo/api/events/${eventId}/`, { withCredentials: true });
      setMessage("Event deleted.");
      // If the deleted event was being edited, clear it.
      if (selectedEvent && selectedEvent.id === eventId) {
        setSelectedEvent(null);
        setFormData({ title: '', description: '', event_date: '', location: '', min_tier: '' });
      }
      fetchEvents();
    } catch (error: any) {
      console.error("Error deleting event:", error.response?.data || error.message);
      setMessage("Failed to delete event.");
    }
  };

  // Filter registrations belonging to the selected event.
  const filteredRegistrations = selectedEvent
    ? registrations.filter(reg => reg.event === selectedEvent.id)
    : [];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Event Management</Typography>
      {message && <Typography color="error">{message}</Typography>}

      {/* Event Form Section */}
      <Box sx={{ mb: 4, p: 2, border: '1px solid #ccc' }}>
        <Typography variant="h5" gutterBottom>
          {selectedEvent ? "Edit Event" : "Create New Event"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            fullWidth
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            fullWidth
            multiline
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="Event Date"
            name="event_date"
            type="datetime-local"
            value={formData.event_date ? formData.event_date.slice(0,16) : ''}
            onChange={(e) => setFormData({...formData, event_date: e.target.value})}
            fullWidth
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            fullWidth
            sx={{ mb: 2 }}
            required
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="min-tier-label">Minimum Tier</InputLabel>
            <Select
              labelId="min-tier-label"
              name="min_tier"
              value={formData.min_tier || ''}
              label="Minimum Tier"
              onChange={(e) => setFormData({...formData, min_tier: e.target.value})}
              required
            >
              <MenuItem value="Basic">Basic</MenuItem>
              <MenuItem value="Premium">Premium</MenuItem>
              <MenuItem value="VIP">VIP</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" type="submit">
            {selectedEvent ? "Update Event" : "Create Event"}
          </Button>
          {selectedEvent && (
            <Button
              variant="outlined"
              onClick={() => {
                setSelectedEvent(null);
                setFormData({ title: '', description: '', event_date: '', location: '', min_tier: '' });
              }}
              sx={{ ml: 2 }}
            >
              Cancel
            </Button>
          )}
        </form>
      </Box>

      {/* Events List */}
      <Typography variant="h5" gutterBottom>All Events</Typography>
      {events.map(event => (
        <Card key={event.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5">{event.title}</Typography>
            <Typography>{event.description}</Typography>
            <Typography>Date: {new Date(event.event_date).toLocaleString()}</Typography>
            <Typography>Location: {event.location}</Typography>
            <Typography>Minimum Tier: {event.min_tier}</Typography>
            <Typography>
              Participants: {event.participants.length > 0 ? event.participants.map(p => p.username).join(", ") : "None"}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Button variant="outlined" onClick={() => handleEdit(event)} sx={{ mr: 1 }}>
                Edit &amp; View Registrations
              </Button>
              <Button variant="outlined" color="error" onClick={() => handleDelete(event.id)}>
                Delete
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}

      {/* Registration Requests for Selected Event */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          {selectedEvent ? `Registration Requests for "${selectedEvent.title}"` : "Select an event to view registration requests"}
        </Typography>
        {selectedEvent && filteredRegistrations.length === 0 && (
          <Typography>No registration requests for this event.</Typography>
        )}
        {filteredRegistrations.map(reg => (
          <Card key={reg.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">
                User: {reg.user.username}
              </Typography>
              <Typography>Status: {reg.status}</Typography>
              {reg.status === "Pending" && (
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
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default EventManagement;
