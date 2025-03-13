
import React, { useState } from 'react';
import { submitFeedback } from '../services/api';

interface FeedbackSectionProps {
  eventId: number;
  onFeedbackSubmitted: () => void;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({ eventId, onFeedbackSubmitted }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitFeedback({ event: eventId, content });
    setContent('');
    onFeedbackSubmitted();
  };

  return (
    <div>
      <h4>提交反馈</h4>
      <form onSubmit={handleSubmit}>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="请输入反馈内容" required />
        <br />
        <button type="submit">提交反馈</button>
      </form>
    </div>
  );
};

export default FeedbackSection;
