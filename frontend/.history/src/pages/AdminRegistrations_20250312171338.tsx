import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useParams } from 'react-router-dom';

interface Registration {
  id: number;
  user: number;
  event: number;
  status: string;
}

const AdminRegistrations: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    API.get(`/admin/events/${eventId}/registrations/`).then(response => {
      setRegistrations(response.data);
    }).catch(err => console.error(err));
  }, [eventId]);

  const updateRegistration = async (regId: number, action: 'approve' | 'reject') => {
    try {
      await API.post(`/admin/registrations/${regId}/${action}/`);
      setMessage(`Registration ${action}d successfully`);
      const res = await API.get(`/admin/events/${eventId}/registrations/`);
      setRegistrations(res.data);
    } catch (error) {
      setMessage('Operation failed');
    }
  };

  return (
    <div>
      <h2>Event Registrations</h2>
      {registrations.map(reg => (
        <div key={reg.id}>
          <p>Registration ID: {reg.id} - Status: {reg.status}</p>
          <button onClick={() => updateRegistration(reg.id, 'approve')}>Approve</button>
          <button onClick={() => updateRegistration(reg.id, 'reject')}>Reject</button>
        </div>
      ))}
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminRegistrations;