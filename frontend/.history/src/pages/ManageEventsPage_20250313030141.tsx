import React, { useEffect, useState } from 'react';
import { fetchEvents, createEvent, updateEvent, deleteEvent, updateRegistrationStatus } from '../services/api';

interface Event {
  id: number;
  title: string;
  description: string;
  event_date: string;
  location: string;
  participants: { id: number, username: string }[];
  registrations: { id: number, user: { id: number, username: string }, status: string }[];
  created_by?: { username: string };
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

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const data = await fetchEvents();
    // 这里假设当前用户的用户名为 "admin"，仅显示该用户创建的活动
    const filtered = data.filter((e: Event) => e.created_by?.username === "admin");
    setEvents(filtered);
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(editingEvent){
      await updateEvent(editingEvent.id, formData);
    } else {
      await createEvent(formData);
    }
    setFormData({title:'', description:'', event_date:'', location:'', min_tier:''});
    setEditingEvent(null);
    loadEvents();
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      event_date: event.event_date,
      location: event.location,
      min_tier: '', // 根据需要设置默认值
    });
  };

  const handleDelete = async (eventId: number) => {
    await deleteEvent(eventId);
    loadEvents();
  };

  const handleUpdateRegistration = async (registrationId: number, status: string) => {
    await updateRegistrationStatus(registrationId, status);
    loadEvents();
  };

  if(loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>管理您的活动</h1>
      <form onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleInputChange} placeholder="标题" required />
        <br />
        <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="描述" required />
        <br />
        <input name="event_date" type="datetime-local" value={formData.event_date} onChange={handleInputChange} required />
        <br />
        <input name="location" value={formData.location} onChange={handleInputChange} placeholder="地点" required />
        <br />
        <input name="min_tier" value={formData.min_tier} onChange={handleInputChange} placeholder="最低会员等级" required />
        <br />
        <button type="submit">{editingEvent ? "更新活动" : "创建活动"}</button>
      </form>

      <h2>您的活动</h2>
      {events.map(event => (
        <div key={event.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>时间：{new Date(event.event_date).toLocaleString()}</p>
          <p>地点：{event.location}</p>
          <p>参与者：{event.participants.map(p => p.username).join(", ")}</p>
          <button onClick={() => handleEdit(event)}>编辑</button>
          <button onClick={() => handleDelete(event.id)}>删除</button>
          <h4>报名记录：</h4>
          {event.registrations.map(reg => (
            <div key={reg.id}>
              <span>{reg.user.username} - {reg.status}</span>
              {reg.status === "Pending" && (
                <>
                  <button onClick={() => handleUpdateRegistration(reg.id, "Approved")}>批准</button>
                  <button onClick={() => handleUpdateRegistration(reg.id, "Rejected")}>拒绝</button>
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
