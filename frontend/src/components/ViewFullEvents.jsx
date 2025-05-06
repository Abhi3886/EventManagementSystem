import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ViewFullEvents.css"; 
import LoadingSpinner from "./LoadingSpinner";

const API_BASE_URL = "http://localhost:5000";
const ViewFullEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(""); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [selectedMonth, searchQuery, events]);

  const fetchEvents = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.get(`${API_BASE_URL}/getEvents`);
      if (response.status === 200) {
        setEvents(response.data);
        setFilteredEvents(response.data); 
      } else {
        throw new Error("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setErrorMessage("Failed to load events. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = events;

    if (selectedMonth) {
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.event_date);
        const eventMonth = eventDate.toLocaleString("default", { month: "short" }).toLowerCase();
        return eventMonth === selectedMonth.toLowerCase();
      });
    }

    if (searchQuery) {
      filtered = filtered.filter((event) =>
        event.event_title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  };

  return (
    <div className="viewEvent-container">
      {isLoading && <LoadingSpinner />}
      <div className="viewEvent-hero">
  <h1 className="viewEvent-hero-title">Explore Faculty Events</h1>
  <p className="viewEvent-hero-subtitle">Discover exciting events hosted by our faculty. Click on an event to see details.</p>
</div>
      <div className="viewEvent-filters">
        <input
          type="text"
          placeholder="Search events..."
          className="viewEvent-search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="viewEvent-month-dropdown"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">All Months</option>
          <option value="jan">January</option>
          <option value="feb">February</option>
          <option value="mar">March</option>
          <option value="apr">April</option>
          <option value="may">May</option>
          <option value="jun">June</option>
          <option value="jul">July</option>
          <option value="aug">August</option>
          <option value="sep">September</option>
          <option value="oct">October</option>
          <option value="nov">November</option>
          <option value="dec">December</option>
        </select>
      </div>

      {isLoading && <p className="viewEvent-loading-text">Loading events...</p>}
      {errorMessage && <p className="viewEvent-error-text">{errorMessage}</p>}

      <div className="viewEvent-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="viewEvent-card"
              onClick={() => navigate(`/event/faculty/${event.id}`)}
            >
              <img
                src={`${API_BASE_URL}${event.event_image}`}
                alt={event.event_title}
                className="viewEvent-image"
              />
              <div className="viewEvent-card-content">
                <h2 className="viewEvent-title">{event.event_title}</h2>
                <p className="viewEvent-date">
                  {new Date(event.event_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="viewEvent-no-events">No events found.</p>
        )}
      </div>

      <footer className="viewEvent-footer">
  <p>© 2025 MIT WPU Events. All rights reserved.</p>
</footer>
    </div>
  );
};

export default ViewFullEvents;