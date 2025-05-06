import React, { useState, useEffect ,useContext} from "react";
import Navbar from "./Navbar";


import { useSpring, animated, config } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight, FaCalendar, FaUsers, FaSmile, FaFacebook, FaTwitter, FaInstagram ,FaBell} from "react-icons/fa";
import { motion } from "framer-motion";
import mitLogo from '../assets/MIT_logo.png';
import avatar1 from '../assets/avatar1.avif';
import { useNavigate } from "react-router-dom";
import avatar2 from '../assets/avatar2.avif';
import avatar3 from '../assets/avatar3.avif';
import Loader from "./Loader"; 
import axios from "axios";
const Faculty = () => {
    const api_url = 'http://localhost:5000';
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [studentDetails, setStudentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);
const [filteredEvents, setFilteredEvents] = useState([]);
  
const fetchData = async () => {
  setLoading(true);
  setError(null);

  try {
    const eventsResponse = await axios.get("http://localhost:5000/getEvents", {
      withCredentials: true, 
    });

    const eventsData = eventsResponse.data;
    console.log("events data:", eventsData);

    setEvents(eventsData);
    setFilteredEvents(filterEventsByAudience(eventsData));

    const studentResponse = await axios.get("http://localhost:5000/student/studentDetails", {
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

  },[]);
  const eventsToDisplay = showAll ? events : events.slice(0, 4);

  const handleShowMore = () => {
    setShowAll(true);
  };

  const filterEventsByAudience = (events) => {
    return events.filter((event) => event.target_audience === 'faculty' || event.target_audience === 'both');
  };

  const [homeRef, homeInView] = useInView({ triggerOnce: true });
  const homeAnimation = useSpring({
    opacity: homeInView ? 1 : 0,
    transform: homeInView ? "translateY(0)" : "translateY(50px)",
    config: config.wobbly,
  });

  const [aboutRef, aboutInView] = useInView({ triggerOnce: true });
  const aboutAnimation = useSpring({
    opacity: aboutInView ? 1 : 0,
    transform: aboutInView ? "translateY(0)" : "translateY(50px)",
    config: config.gentle,
  });

  const [eventsRef, eventsInView] = useInView({ triggerOnce: true });
  const eventsAnimation = useSpring({
    opacity: eventsInView ? 1 : 0,
    transform: eventsInView ? "translateY(0)" : "translateY(50px)",
    config: config.slow,
  });

  const [registeredRef, registeredInView] = useInView({ triggerOnce: true });
  const registeredAnimation = useSpring({
    opacity: registeredInView ? 1 : 0,
    transform: registeredInView ? "translateY(0)" : "translateY(50px)",
    config: config.molasses,
  });

  const [testimonialsRef, testimonialsInView] = useInView({ triggerOnce: true });
  const testimonialsAnimation = useSpring({
    opacity: testimonialsInView ? 1 : 0,
    transform: testimonialsInView ? "translateY(0)" : "translateY(50px)",
    config: config.stiff,
  });

  const [contactRef, contactInView] = useInView({ triggerOnce: true });
  const contactAnimation = useSpring({
    opacity: contactInView ? 1 : 0,
    transform: contactInView ? "translateY(0)" : "translateY(50px)",
    config: config.default,
  });

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
      {/* Left Side - About Info */}
      <div className="about-left">
        <div className="about-card">
          <h3>🎯 Our Mission</h3>
          <p>Connecting Faculties with events that inspire, educate, and entertain.</p>
        </div>
        <div className="about-card">
          <h3>🚀 Our Vision</h3>
          <p>Building a dynamic faculty community that fosters learning, networking, and growth.</p>
        </div>
      </div>

      <div className="about-right">
  <div className="category-card">
    <h3>🔬 Academic Seminars</h3>
    <p>Engage in seminars that focus on cutting-edge research and developments in your field.</p>
  </div>
  <div className="category-card">
    <h3>📚 Research Collaboration</h3>
    <p>Collaborate with faculty and researchers on impactful academic projects.</p>
  </div>
  <div className="category-card">
    <h3>🏫 Professional Development</h3>
    <p>Stay updated with the latest trends in education, pedagogy, and leadership.</p>
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

              <button className = "showMoreBtns" onClick={() => navigate(`/event/faculty/${event.id}`)}>
                Show More <FaArrowRight />
              </button>
            </div>
          ))}
          <div className="showmoreSection">
            {!showAll && filteredEvents.length > 3 && (
              <button className="show-more-btn" onClick={()=>navigate('/faculty/events')}>
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

export default Faculty;