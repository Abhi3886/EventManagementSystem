import React, { useState, useEffect, useContext } from "react";
import "./Student.css";
import Navbar from "./Navbar";
import { useSpring, animated, config } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight, FaCalendar, FaUsers, FaSmile, FaFacebook, FaTwitter, FaInstagram, FaUser ,FaBell} from "react-icons/fa";
import avatar1 from '../assets/avatar1.avif';
import avatar2 from '../assets/avatar2.avif';
import avatar3 from '../assets/avatar3.avif';
import Loader from "./Loader"; 
import registerEvent from "./registerEvent";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const Student = () => {
  const api_url = 'http://localhost:5000';
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [studentDetails, setStudentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const eventsResponse = await axios.get(`${api_url}/getEvents`, {
        withCredentials: true, 
      });
  
      const eventsData = eventsResponse.data;
      console.log("events data:", eventsData);
  
      setEvents(eventsData);
      setFilteredEvents(filterEventsByAudience(eventsData));
  
      const studentResponse = await axios.get(`${api_url}/student/studentDetails`, {
        withCredentials: true,
      });
  
      setStudentDetails(studentResponse.data.user);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  

    fetchData();

   
  }, []);
  const filterEventsByAudience = (events) => {
    return events.filter((event) => event.target_audience === 'Student' || event.target_audience === 'both');
  };
  const eventsToDisplay = showAll ? events : events.slice(0, 4);
  
  
  
  const handleShowMore = () => {
    setShowAll(true);
  };

  const [aboutRef, aboutInView] = useInView({ triggerOnce: true });
  const aboutAnimation = useSpring({
    opacity: aboutInView ? 1 : 0,
    transform: aboutInView ? "translateY(0)" : "translateY(50px)",
    config: config.gentle,
  });

  
function handleRegister(evenId)
{
  navigate(`/student/register/${evenId}`);
  
}
  return (
    <div className="student-page">
      <Navbar />
   
    

      <section id="home" className="home">
        <video autoPlay muted loop className="background-video">
          <source src="https://mitwpu.edu.in/uploads/banner/banner_video_desktop.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      <section id="about" className="section about" ref={aboutRef}>
  <animated.div style={aboutAnimation}>
    <h2>About Event Hub</h2>
    <p className="section-description">
      Discover and participate in exciting events across various categories. Whether it's tech, career, culture, or sports, 
      we've got something for everyone!
    </p>

    <div className="about-container">
      <div className="about-left">
        <div className="about-card">
          <h3>🎯 Our Mission</h3>
          <p>Connecting students with events that inspire, educate, and entertain.</p>
        </div>
        <div className="about-card">
          <h3>🚀 Our Vision</h3>
          <p>Building a dynamic student community that fosters learning, networking, and growth.</p>
        </div>
      </div>

      <div className="about-right">
        <div className="category-card">
          <h3>💻 Tech & Innovation</h3>
          <p>Hackathons, coding workshops, and tech talks.</p>
        </div>
        <div className="category-card">
          <h3>🎭 Cultural & Arts</h3>
          <p>Music festivals, art exhibitions, and cultural fests.</p>
        </div>
        <div className="category-card">
          <h3>🏆 Sports & Fitness</h3>
          <p>Sports tournaments, fitness challenges, and yoga sessions.</p>
        </div>
      </div>
    </div>
  </animated.div>
</section>



     <section id="events" className="section events">
      <h2 className="events-title">Upcoming Events</h2>
      <p className="section-description">
        Explore a wide range of events tailored for students. From tech workshops to cultural fests, there's something for everyone!
      </p>

      {loading ? (
        <div className="event-loader-container">
          <Loader />
        </div>
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : (
        <div className="event-grid">
          {filteredEvents.slice(0, showAll ? filteredEvents.length : 3).map((event) => (
            <div key={event.id} className="event-card">
              {event.event_image && (
                <img
                  src={`http://localhost:5000${event.event_image}`}
                  alt={event.event_title}
                  className="event-image"
                />
              )}
              
              <h3 className="event-name">{event.event_title}</h3>

              <button onClick={() => navigate(`/event/student/${event.id}`)}>
                Show More <FaArrowRight />
              </button>
            </div>
          ))}
          <div className="showmoreSection">
            {!showAll && filteredEvents.length > 3 && (
              <button className="show-more-btn" onClick={()=>navigate('/student/events')}>
                <FaArrowRight /> 
              </button>
            )}
          </div>
        </div>
      )}
    </section>

      
<section id="speakers" className="section speakers">
  <h2>Featured Speakers</h2>
  <p className="section-description">
    Meet the inspiring speakers who will be sharing their knowledge and experiences at our events.
  </p>
  <div className="speaker-grid">
    <div className="speaker-card">
      <img src={avatar1} alt="Speaker 1" className="speaker-image" />
      <div className="inner-speaker-card">
      <h3>John Doe</h3>
      <p>Tech Entrepreneur</p>
      </div>
    </div>
    <div className="speaker-card">
      <img src={avatar2} alt="Speaker 2" className="speaker-image" />
      <div className="inner-speaker-card">
      <h3>Jane Smith</h3>
      <p>Career Coach</p>
      </div>
    </div>
    <div className="speaker-card">
      <img src={avatar3} alt="Speaker 3" className="speaker-image" />
      <div className="inner-speaker-card">
      <h3>Alex Johnson</h3>
      <p>Artist & Innovator</p>
      </div>
    </div>
  </div>
</section>


<section id= "contact" className="footer">
  <div className="footer-container">
    <div className="footer-info">
      <p>&copy; 2025 MIT World Peace University</p>
      <p>All rights reserved</p>
    </div>
    <div className="footer-links">
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
      <a href="#">Contact Us</a>
    </div>
    <div className="footer-social">
      <a href="https://facebook.com" target="_blank">Facebook</a>
      <a href="https://twitter.com" target="_blank">Twitter</a>
      <a href="https://linkedin.com" target="_blank">LinkedIn</a>
    </div>
  </div>
</section>

    </div>
  );
};

export default Student;