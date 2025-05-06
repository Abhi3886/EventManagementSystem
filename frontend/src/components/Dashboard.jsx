import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Dashboard.css'; 

const Dashboard = () => {
  const [eventDetails, setEventDetails] = useState([]);
  const [eventCount, setEventCount] = useState(0);
  const userId = Cookies.get('userId');

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/registered-events/${userId}`);
        const data = await response.json();
        console.log("Fetched Registered Events:", data);

        if (data && data.count > 0) {
          setEventCount(data.count);
          setEventDetails(data.eventDetails);
        } else {
          setEventCount(0);
          setEventDetails([]);
        }
      } catch (error) {
        console.error("Error fetching registered events:", error);
      }
    };

    fetchRegisteredEvents();
  }, [userId]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title"> Registered Events</h1>
      <p className="dashboard-event-count"><strong>Total Registered Events:</strong> {eventCount}</p>

      {eventCount > 0 ? (
        <div className="dashboard-event-list">
          {eventDetails.map((event, index) => (
            <div key={index} className="dashboard-event-card">
             
              {event.event_image && (
                <img
                  src={`http://localhost:5000${event.event_image}`}
                  alt={event.event_title}
                  className="dashboard-event-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/320x180'; 
                  }}
                />
              )}
              <div className="dashboard-event-content">
                <h2 className="dashboard-event-title">{event.event_title}</h2>
                <p className="dashboard-event-date">
                  <strong>Date:</strong> {new Date(event.event_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="dashboard-event-time">
                  <strong>Time:</strong> {event.event_time}
                </p>
                <p className="dashboard-event-venue">
                  <strong>Venue:</strong> {event.event_venue}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="dashboard-no-events">No registered events found.</p>
      )}
    </div>
  );
};

export default Dashboard;