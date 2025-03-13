// src/components/EventListPage.tsx
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
  // 假设当前用户信息已存储（可从 context 或全局状态中获取）
  const currentUser: User = { id: 1, username: 'current_user' };

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response.data);
    } catch (error) {
      console.error("加载活动失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (eventId: number) => {
    try {
      await applyEventRegistration({ event: eventId });
      // 重新加载活动列表以更新状态
      loadEvents();
    } catch (error) {
      console.error("申请参加失败:", error);
    }
  };

  // 判断当前用户是否已报名且审批通过
  const isApproved = (registrations: Registration[]) => {
    return registrations.some(reg => reg.user.username === currentUser.username && reg.status === "Approved");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>可参加的活动</h1>
      {events.map(event => (
        <div key={event.id} style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>时间：{new Date(event.event_date).toLocaleString()}</p>
          <p>地点：{event.location}</p>
          <p>参与者：{event.participants.map(p => p.username).join(", ") || "暂无"}</p>
          {/* 如果当前用户未报名或审批未通过，则显示申请按钮 */}
          {!isApproved(event.registrations) && (
            <button onClick={() => handleApply(event.id)}>申请参加</button>
          )}
          {/* 如果当前用户已经报名且审批通过，则显示反馈组件 */}
          {isApproved(event.registrations) && (
            <FeedbackSection eventId={event.id} onFeedbackSubmitted={loadEvents} />
          )}
        </div>
      ))}
    </div>
  );
};

export default EventListPage;
