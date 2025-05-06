import React, { useState, useEffect } from "react";
import './EventMaker.css';
import { useNavigate } from "react-router-dom"; 

const EventMaker = () => {
  const [formData, setFormData] = useState({
    event_title: "",
    event_category: "",
    event_description: "",
    event_date: "",
    event_time: "",
    event_venue: "",
    expected_participants: "",
    organizer_name: "",
    organizer_email: "",
    organizer_phone: "",
    sponsorship_info: "",
    event_website: "",
    additional_notes: "",
    organization_name: "",
    target_audience: "",
    event_type: "free",
  });

  const [imageFile, setImageFile] = useState(null);
  const [events, setEvents] = useState([]);
  const [step, setStep] = useState(1);

  const navigate = useNavigate(); 

  useEffect(() => {
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
      const [name, value] = cookie.split("=");
      acc[name] = value;
      return acc;
    }, {});

    setFormData((prevFormData) => ({
      ...prevFormData,
      event_manager_id: cookies.eventManagerId || "",
      experience: cookies.experience || "",
    }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file); 
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formDataToSend = new FormData();
      
      Object.entries(formData).forEach(([key, value]) => {
        if (value) formDataToSend.append(key, value);
      });
  
      if (imageFile) {
        formDataToSend.append("event_image", imageFile);
      }
  
      const response = await fetch("http://localhost:5000/createEvent", {
        method: "POST",
        credentials: "include", 
        body: formDataToSend,
      });
  
      console.log("Response:", response);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create event");
      }
  
      const newEvent = await response.json();
      console.log("Event created successfully:", newEvent);
  
      setEvents((prevEvents) => [...prevEvents, newEvent.event]);
  
      // Reset form
      setFormData({
        event_title: "",
        event_category: "",
        event_description: "",
        event_date: "",
        event_time: "",
        event_venue: "",
        expected_participants: "",
        organizer_name: "",
        organizer_email: "",
        organizer_phone: "",
        sponsorship_info: "",
        event_website: "",
        additional_notes: "",
        organization_name: "",
        target_audience: "",
        event_type: "",
      });
  
      setImageFile(null); 
      setStep(5); 
    } catch (error) {
      console.error("Error creating event:", error.message);
    }
  };

  return (
    <div className="EventDiv">
      <div className="dashboard-button">
        <button onClick={() => navigate("/event/dashboard")}>
          Go to Dashboard
        </button>
      </div>
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {step === 1 && (
          <div className="step1 EventDiv">
            <h3>Step 1: Event Basic Information</h3>
            <input
              type="text"
              name="event_title"
              placeholder="Event Title"
              value={formData.event_title}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="event_category"
              placeholder="Event Category"
              value={formData.event_category}
              onChange={handleChange}
              required
            />
            <textarea
              name="event_description"
              placeholder="Event Description"
              value={formData.event_description}
              onChange={handleChange}
              required
            />
            
            {/* Target Audience Field */}
            <div className="target-audience">
              <h4>Target Audience:</h4>
              <select 
                name="target_audience" 
                value={formData.target_audience} 
                onChange={handleChange} 
                required
              >
                <option value="">Select Audience</option>
                <option value="Student">Student</option>
                <option value="Faculty">Faculty</option>
                <option value="both">Both</option>
              </select>
            </div>
            
            <div className="event-type">
              <h4>Event Type:</h4>
              <select 
                name="event_type" 
                value={formData.event_type} 
                onChange={handleChange} 
                required
              >
                <option value="">Select Event Type</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            <button type="button" onClick={() => setStep(2)}>
              Next Step
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="step2 EventDiv">
            <h3>Step 2: Event Details</h3>
            <input
              type="date"
              name="event_date"
              value={formData.event_date}
              onChange={handleChange}
              required
            />
            <input
              type="time"
              name="event_time"
              value={formData.event_time}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="event_venue"
              placeholder="Event Venue"
              value={formData.event_venue}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="expected_participants"
              placeholder="Expected Participants"
              value={formData.expected_participants}
              onChange={handleChange}
              required
            />
            <button type="button" onClick={() => setStep(3)}>
              Next Step
            </button>
            <button type="button" onClick={() => setStep(1)}>
              Previous Step
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="step3 EventDiv">
            <h3>Step 3: Organizer & Additional Info</h3>
            <input
              type="text"
              name="organizer_name"
              placeholder="Organizer Name"
              value={formData.organizer_name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="organizer_email"
              placeholder="Organizer Email"
              value={formData.organizer_email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="organizer_phone"
              placeholder="Organizer Phone"
              value={formData.organizer_phone}
              onChange={handleChange}
              required
            />
            <textarea
              name="sponsorship_info"
              placeholder="Sponsorship Info"
              value={formData.sponsorship_info}
              onChange={handleChange}
            />
            <input
              type="url"
              name="event_website"
              placeholder="Event Website"
              value={formData.event_website}
              onChange={handleChange}
            />
            <textarea
              name="additional_notes"
              placeholder="Additional Notes"
              value={formData.additional_notes}
              onChange={handleChange}
            />
            <input
              type="text"
              name="organization_name"
              placeholder="Organization Name"
              value={formData.organization_name}
              onChange={handleChange}
              required
            />
            <label>Upload Event Image:</label>
            <input
              type="file"
              name="event_image"
              accept="image/*"
              onChange={handleFileChange}
              required
            />

            <button type="button" onClick={() => setStep(4)}>
              Next Step
            </button>
            <button type="button" onClick={() => setStep(2)}>
              Previous Step
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="step4 EventDiv">
            <h3>Step 4: Review & Submit</h3>
            <div className="EventDiv">
              <h4>Event Title:</h4>
              <p>{formData.event_title}</p>
              <h4>Event Category:</h4>
              <p>{formData.event_category}</p>
              <h4>Target Audience:</h4>
              <p>{formData.target_audience}</p>
              <h4>Event Type:</h4>
              <p>{formData.event_type}</p>
            </div>
            <button type="submit">Create Event</button>
            <button type="button" onClick={() => setStep(3)}>
              Previous Step
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="step5 EventDiv">
            <h3>Success! Event Created</h3>
            <p>Your event has been successfully created.</p>
            <button type="button" onClick={() => setStep(1)}>
              Create Another Event
            </button>
            <button type="button" onClick={() => window.location.href = "/event/dashboard"}>
              Go to Dashboard
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default EventMaker;