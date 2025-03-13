// src/pages/AdminRegistrations.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

interface Registration {
  id: number;
  user: any; // 根据需要定义用户类型
  event: number;
  status: string;
}

const AdminRegistrations: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (eventId) {
      api.get(`events/${eventId}/registrations/`)
        .then(response => {
          setRegistrations(response.data);
        })
        .catch(error => {
          console.error(error);
          setMessage('Failed to load registrations');
        });
    }
  }, [eventId]);

  const handleApprove = async (registrationId: number) => {
    try {
      await api.post(`registrations/${registrationId}/approve/`);
      setMessage('Registration approved');
      // 刷新数据
      if (eventId) {
        const res = await api.get(`events/${eventId}/registrations/`);
        setRegistrations(res.data);
      }
    } catch (error) {
      console.error(error);
      setMessage('Approval failed');
    }
  };

  const handleReject = async (registrationId: number) => {
    try {
      await api.post(`registrations/${registrationId}/reject/`);
      setMessage('Registration rejected');
      if (eventId) {
        const res = await api.get(`events/${eventId}/registrations/`);
        setRegistrations(res.data);
      }
    } catch (error) {
      console.error(error);
      setMessage('Rejection failed');
    }
  };

  return (
    <div>
      <h2>Admin - Event Registrations</h2>
      {message && <p>{message}</p>}
      {registrations.length > 0 ? (
        registrations.map(reg => (
          <div key={reg.id}>
            <p>
              Registration ID: {reg.id} - Status: {reg.status}
            </p>
            <button onClick={() => handleApprove(reg.id)}>Approve</button>
            <button onClick={() => handleReject(reg.id)}>Reject</button>
          </div>
        ))
      ) : (
        <p>No registrations found for this event.</p>
      )}
    </div>
  );
};

export default AdminRegistrations;
