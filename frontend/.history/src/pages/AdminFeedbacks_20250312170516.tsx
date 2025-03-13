import React, { useEffect, useState } from 'react';
import API from '../api';
import { useParams } from 'react-router-dom';

interface Feedback {
  id: number;
  user: number;
  content: string;
  created_at: string;
}

const AdminFeedbacks: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    API.get(`/admin/events/${eventId}/feedbacks/`).then(response => {
      setFeedbacks(response.data);
    }).catch(err => console.error(err));
  }, [eventId]);

  return (
    <div>
      <h2>Feedbacks for Event</h2>
      {feedbacks.map(fb => (
        <div key={fb.id}>
          <p>{fb.content}</p>
          <p>Submitted at: {fb.created_at}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminFeedbacks;