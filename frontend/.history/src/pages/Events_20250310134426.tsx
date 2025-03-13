import React, { useEffect, useState } from "react";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/events/").then((response) => {
      setEvents(response.data);
    });
  }, []);

  const handleRegister = (eventId: number) => {
    axios.post("http://127.0.0.1:8000/registrations/", { event: eventId, user: 1 }).then(() => {
      alert("报名成功");
    });
  };

  return (
    <div>
      <h2>活动列表</h2>
      {events.map((event) => (
        <div key={event.id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <button onClick={() => handleRegister(event.id)}>报名参加</button>
        </div>
      ))}
    </div>
  );
};

export default Events;
