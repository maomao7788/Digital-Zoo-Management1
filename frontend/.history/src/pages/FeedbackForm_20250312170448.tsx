
import React, { useState } from 'react';
import API from '../api';
import { useParams } from 'react-router-dom';

const FeedbackForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post(`/events/${id}/feedback/`, { content });
      setMessage('Feedback submitted successfully');
      setContent('');
    } catch (error) {
      setMessage('Feedback submission failed');
    }
  };

  return (
    <div>
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <textarea value={content} onChange={e => setContent(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FeedbackForm;