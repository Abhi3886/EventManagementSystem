import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EventInfo.css";

const EventInfo = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [student, setStudent] = useState({ name: "", email: "" });
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/getEvents")
      .then((res) => res.json())
      .then((data) => {
        const selectedEvent = data.find((event) => event.id.toString() === eventId);
        if (selectedEvent) {
          setEvent(selectedEvent);
        } else {
          setError("Event not found");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [eventId]);

  const openConfirmModal = () => {
    fetch("http://localhost:5000/student/studentDetails", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data.user);

        if (data.user) {
          setStudent({ 
            id: data.user.id, 
            name: data.user.name, 
            email: data.user.email, 
            role: data.user.role 
          });
          setIsConfirmModalOpen(true);
        } else {
          alert("User details not found");
        }
      })
      .catch((err) => alert("Error fetching student details: " + err.message));
  };
  
  const confirmAvailability = () => {
    setIsConfirmModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleRegister = () => {
    const registrationData = {
      eventId: eventId,
      student_id: student.id,
      phone_number: phone, 
    };
  
    if (student.role === "faculty") {
      registrationData.role = role;
    }
  
    fetch("http://localhost:5000/registerEvent", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registrationData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "Registered successfully!");
        setIsRegisterModalOpen(false);
      })
      .catch((err) => alert("Registration failed: " + err.message));
  };
  

  if (loading) return <p className="event-loading">Loading...</p>;
  if (error) return <p className="event-error">Error: {error}</p>;

  return (
    <div className="event-details-container">
      <h1 className="event-details-title">{event.event_title}</h1>
      {event.event_image && (
        <img src={`http://localhost:5000${event.event_image}`} alt={event.event_title} className="event-details-image" />
      )}
      <div className="event-details-description-container">
        <p className="event-details-description">{event.event_description}</p>
      </div>
      <div className="event-details-footer">
        {event.event_website && (
          <a href={event.event_website} target="_blank" rel="noopener noreferrer" className="event-details-website">
            Visit Event Website
          </a>
        )}
        <button className="event-details-register-btn" onClick={openConfirmModal}>
          Register Now
        </button>
      </div>

      {isConfirmModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Availability</h2>
            <p>Hello {student.name}, are you available on {event.event_date}?</p>
            <button onClick={confirmAvailability}>Yes</button>
            <button onClick={() => setIsConfirmModalOpen(false)}>No</button>
          </div>
        </div>
      )}

{isRegisterModalOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Register for Event</h2>
      <label>Name:</label>
      <input type="text" value={student.name} disabled />
      <label>Email:</label>
      <input type="email" value={student.email} disabled />
      <label>Phone:</label>
      <input 
        type="text" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
        required 
      />
      {student.role === "student" && (
        <>
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </>
      )}
      {student.role === "faculty" && (
        <>
          <label>How would you like to contribute?</label>
          <select onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="Judge">Judge</option>
            <option value="Speaker">Speaker</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Guest">Guest</option>
          </select>
        </>
      )}

      <button onClick={handleRegister}>Confirm Registration</button>
      <button onClick={() => setIsRegisterModalOpen(false)}>Cancel</button>
    </div>
  </div>
)}

    </div>
  );
};

export default EventInfo;