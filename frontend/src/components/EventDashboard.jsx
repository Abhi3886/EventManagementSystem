import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './EventDashboard.css';

const EventDashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("http://localhost:5000/event/dashboard", {
          method: "GET",
          credentials: "include", 
        });

        if (response.status==200) {
          const data = await response.json();
          setEvents(data.events);  
          setLoading(false);
        } else {
            
          throw new Error("Failed to fetch events");
        }
      } catch (err) {
        setError("Failed to fetch event data. Please try again.");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
  

  if (loading) {
    return <div className="loading">Loading events...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
    <div className="event-dashboard-container">
      <h2 className="eventDashHeading">Event Manager Dashboard</h2>
      <div className="event-list">
        {events.length > 0 ? (
          events.map((event) => (
            <div
            key={event.id}
            className="event-card"
            onClick={() => handleGoToEventDetail(event.id)}
            >
              <h3 className="event-title">{event.event_title}</h3>
              <p className="event-category">{event.event_category}</p>
              <p className="event-date">{event.event_date}</p>
              <p className="event-venue">{event.event_venue}</p>
              <p className="event-participants">
                {event.expected_participants} participants expected
              </p>
            </div>
          ))
        ) : (
          <p className="no-events-message">No events found for your profile.</p>
        )}
      </div>
    </div>
        </>
  );
};

export default EventDashboard;