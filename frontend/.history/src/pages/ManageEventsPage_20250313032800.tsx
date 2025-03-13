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
import React, { useEffect, useState } from 'react';
import { getEvents, createEvent, updateEvent, deleteEvent, updateEventRegistrationStatus } from '../services/api';

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
  min_tier: string;
  participants: User[];
  registrations: Registration[];
  created_by?: User;
}

const ManageEventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    location: '',
    min_tier: '',
  });

  // Assume current user information, for example: current username is "admin"
  const currentUser = { username: 'admin' };

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await getEvents();
      // Only display events created by the current user
      const filtered = response.data.filter((e: Event) => e.created_by?.username === currentUser.username);
      setEvents(filtered);
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await updateEvent(editingEvent.id, formData);
      } else {
        await createEvent(formData);
      }
      setFormData({ title: '', description: '', event_date: '', location: '', min_tier: '' });
      setEditingEvent(null);
      loadEvents();
    } catch (error) {
      console.error("Error submitting event:", error);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
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
      await deleteEvent(eventId);
      loadEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleUpdateRegistration = async (registrationId: number, status: string) => {
    try {
      await updateEventRegistrationStatus(registrationId, status);
      loadEvents();
    } catch (error) {
      console.error("Error updating registration status:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Manage Your Events</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Title"
          required
        />
        <br />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />
        <br />
        <input
          name="event_date"
          type="datetime-local"
          value={formData.event_date}
          onChange={handleInputChange}
          required
        />
        <br />
        <input
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Location"
          required
        />
        <br />
        <input
          name="min_tier"
          value={formData.min_tier}
          onChange={handleInputChange}
          placeholder="Minimum Membership Tier"
          required
        />
        <br />
        <button type="submit">{editingEvent ? "Update Event" : "Create Event"}</button>
      </form>

      <h2>Your Events</h2>
      {events.map(event => (
        <div key={event.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>Date: {new Date(event.event_date).toLocaleString()}</p>
          <p>Location: {event.location}</p>
          <p>Minimum Membership Tier: {event.min_tier}</p>
          <p>Participants: {event.participants.map(p => p.username).join(", ") || "None"}</p>
          <button onClick={() => handleEdit(event)}>Edit</button>
          <button onClick={() => handleDelete(event.id)}>Delete</button>
          <h4>Registration Requests:</h4>
          {event.registrations.map(reg => (
            <div key={reg.id}>
              <span>
                {reg.user.username} - {reg.status}
              </span>
              {reg.status === "Pending" && (
                <>
                  <button onClick={() => handleUpdateRegistration(reg.id, "Approved")}>Approve</button>
                  <button onClick={() => handleUpdateRegistration(reg.id, "Rejected")}>Reject</button>
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ManageEventsPage;
