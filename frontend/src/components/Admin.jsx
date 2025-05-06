import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from "./LoadingSpinner";

const API_BASE_URL = "http://localhost:5000";

const Admin = () => {
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState("all");
    const [editEvent, setEditEvent] = useState(null);
    const [newDate, setNewDate] = useState("");
    const [faculty, setFaculty] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [PendingEvents, setPendingEvents] = useState([]);
  const [ApprovedEvents, setApprovedEvents] = useState([]);


    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [assignModalOpen, setAssignModalOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEvents, setTotalEvents] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const paginationRange = 5;
    const [selectedFacultyId, setSelectedFacultyId] = useState(null); 
  const [totalPendingPages, setTotalPendingPages] = useState(1);
  const [totalApprovedPages, setTotalApprovedPages] = useState(1);
    useEffect(() => {
        fetchEvents(1);   
    }, [selectedFilter]);

    const fetchEvents = async (page = 1,limit=5) => {
      setIsLoading(true);
      setErrorMessage("");
      try {
            const response = await axios.get(`${API_BASE_URL}/getPaginatedEvents`, {
                params: {
                    page: page,
                    limit: limit,
                },
            });

            if (response.status === 200) {
              console.log(response);
              
              console.log(response.data.events);
              setPendingEvents(response.data.pendingEvents);
              setApprovedEvents(response.data.ApprovedEvents);
              setEvents(response.data.events);
              setTotalPendingPages(response.data.totalPendingPages);
              setTotalApprovedPages(response.data.totalApprovedPages);
              // setEvents(response.data.events);
              setTotalEvents(response.data.totalEvents);
              setTotalPages(response.data.totalPages);
              setCurrentPage(response.data.currentPage);


              if(selectedFilter==="pending"){
                setTotalPages(totalPendingPages);
              }
              else if(selectedFilter==="approved"){
                setTotalPages(totalApprovedPages);
              }
              else{
                setTotalPages(response.data.totalPages);
              }

            } else {
                throw new Error(`Failed to fetch events: ${response.status}`);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
            setErrorMessage("Failed to load events. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };
    const openModal = (eventId) => {
        console.log("modal is clicked");
        
      setSelectedEventId(eventId);
      setIsModalOpen(true);
  };

  const closeModal = () => {
    setDropdownOpen(null);
      setIsModalOpen(false);
      setSelectedEventId(null);
  };
    const handleFilter = (status) => {
      setFilter(status);
      setSelectedFilter(status);
        
      handlePageChange(1);
   
        
    };
    const handleApprove = async () => {
      if (!selectedEventId) return;
      
      try {
          await axios.put(`${API_BASE_URL}/updateStatus/${selectedEventId}`);
          toast.success("Event approved successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
          closeModal();
          
      } catch (error) {
          console.error("Error approving event:", error);
      }
  };
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            fetchEvents(newPage);
        }
    };

    const handleEdit = (event) => {
        setEditEvent(event);
        setNewDate(event.event_date);
    };

    const handleSave = async () => {
        try {
            await axios.put(`${API_BASE_URL}/updateEventDate/${editEvent.id}`, {
                event_date: newDate,
            });
            fetchEvents(currentPage);
            setEditEvent(null);
            toast.success("Event date updated successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error("Error updating event:", error);
            setErrorMessage("Failed to update event date. Please try again.");
        }
    };


    const toggleDropdown = (eventId) => {
        setDropdownOpen(dropdownOpen === eventId ? null : eventId);
    };

    const handleAssign = async (eventId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getFaculties`);
            setFaculty(response.data.faculties);
            setSelectedEventId(eventId);
            setAssignModalOpen(true);
            setSelectedFacultyId(null); 
        } catch (error) {
            console.error("Error fetching faculties:", error);
            setErrorMessage("Failed to load faculties. Please try again.");
        }
    };

    const handleSelectFaculty = (userId) => {
        setSelectedFacultyId(userId);
    };

    const handleAssignFaculty = async () => {
        if (!selectedFacultyId) {
            toast.warn("Please select a faculty to assign.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        try {
            await axios.post(`${API_BASE_URL}/assign`, {
                eventId: selectedEventId,
                userId: selectedFacultyId,
            });
            console.log("Faculty assigned successfully");
            setAssignModalOpen(false);
            toast.success("Faculty assigned successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.log("already assigned");
            setAssignModalOpen(false);
            setErrorMessage("Error assigning faculty or faculty already assigned.");
            toast.error("Error assigning faculty or faculty already assigned!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.error("Error assigning faculty:", error);
        }
    };

    const filteredEvents =filter === "all"? events : filter==='pending'?PendingEvents:ApprovedEvents;

   

    return (
        <div className="admin-dashboard">
            

            <div className="main-content">
                

                <h1>Manage Events</h1>

                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <div className="filter-buttons">
                    <button
                        className={`btn all ${selectedFilter === "all" ? "selected" : ""}`}
                        onClick={() => handleFilter("all")}
                    >
                        All Events
                    </button>
                    <button
                        className={`btn approved ${selectedFilter === "approved" ? "selected" : ""}`}
                        onClick={() => handleFilter("approved")}
                    >
                        Approved
                    </button>
                    <button
                        className={`btn pending ${selectedFilter === "pending" ? "selected" : ""}`}
                        onClick={() => handleFilter("pending")}
                    >
                        Pending
                    </button>
                </div>

                {isLoading ? (
                    <LoadingSpinner/>
                ) : (
                    <div className="table-container">
                        <table className="event-table">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredEvents.map((event) => (
                                <tr key={event.id}>
                                    <td>{event.event_title}</td>
                                    <td>{new Date(event.event_date).toLocaleDateString()}</td>
                                    <td className={`status ${event.status}`}>{event.status}</td>
                                    <td>
                                    <div className="dropdown">
            <button className="dropdown-btn" onClick={() => toggleDropdown(event.id)}>
                Actions
            </button>
            {dropdownOpen === event.id && (
                <div className="dropdown-content">
                    <button onClick={() => handleEdit(event)}>Edit</button>
                    <button onClick={() => handleAssign(event.id)}>Assign</button>
                    <button onClick={() => openModal(event.id)}>Approve</button>
                </div>
            )}

                    </div>

                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="pagination">
    <div className="pagBtns">
        <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            aria-label="First Page"
        >
            &laquo; First
        </button>
        <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous Page"
        >
            &lsaquo; Previous
        </button>
    </div>

    <div className="pagNumberText">
        Page {currentPage} of{" "}
        {selectedFilter === "pending"
            ? totalPendingPages
            : selectedFilter === "approved"
            ? totalApprovedPages
            : totalPages}
    </div>

    <div className="pageBtns">
        <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={
                currentPage ===
                (selectedFilter === "pending"
                    ? totalPendingPages
                    : selectedFilter === "approved"
                    ? totalApprovedPages
                    : totalPages)
            }
            aria-label="Next Page"
        >
            Next &rsaquo;
        </button>
        <button
            onClick={() =>
                handlePageChange(
                    selectedFilter === "pending"
                        ? totalPendingPages
                        : selectedFilter === "approved"
                        ? totalApprovedPages
                        : totalPages
                )
            }
            disabled={
                currentPage ===
                (selectedFilter === "pending"
                    ? totalPendingPages
                    : selectedFilter === "approved"
                    ? totalApprovedPages
                    : totalPages)
            }
            aria-label="Last Page"
        >
            Last &raquo;
        </button>
    </div>
</div>


                {editEvent && (
                    <>
                        <div className="modal-overlay" onClick={() => setEditEvent(null)}></div>
                        <div className="edit-modal">
                            <h2>Edit Event Date</h2>
                            <input
                                type="date"
                                value={newDate}
                                onChange={(e) => setNewDate(e.target.value)}
                                className="date-input"
                            />
                            <div className="modal-buttons">
                                <button className="save-btn" onClick={handleSave}>
                                    Save
                                </button>
                                <button className="cancel-btn" onClick={() => 

                                {

                                  setEditEvent(null);
                                  setDropdownOpen(null);

                                }
                                  
                                  
                                  }>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {assignModalOpen && (
  <>
    <div
      className="modal-overlay"
      onClick={() => setAssignModalOpen(false)}
    ></div>
    <div className="assign-modal">
      <h2>Assign Faculty</h2>
      <select
        value={selectedFacultyId || ""}
        onChange={(e) => handleSelectFaculty(e.target.value)}
        className="faculty-dropdown"
      >
        <option value="" disabled>Select Faculty</option>
        {faculty.map((fac) => (
          <option key={fac.userId} value={fac.userId}>
            {fac.userName}
          </option>
        ))}
      </select>
      <div className="modal-buttons">
        <button className="save-btn" onClick={handleAssignFaculty}>
          Assign
        </button>
        <button
          className="cancel-btn"
          onClick={() => 
            
            {setAssignModalOpen(false);
              setDropdownOpen(null);
            }}
        >
          Close
        </button>
      </div>
    </div>
  </>
)}

{isModalOpen && (
  console.log("Modal is open"), 
  <>
    <div
      className="modal-overlay"
      onClick={() => {
        console.log("Modal overlay clicked"); 
        setIsModalOpen(false);
      }}
    ></div>
   
      <div className="assign-modal">
        <h3>Confirm Approval</h3>
        <p>Are you sure you want to approve this event?</p>
        <button
          className="save-btn"
          onClick={() => {
            console.log("Approve button clicked"); 
            handleApprove();
          }}
        >
          Yes, Approve
        </button>
        <button
          className="cancel-btn"
          onClick={() => {
            console.log("Cancel button clicked");
            closeModal();
          }}
        >
          Cancel
        </button>
      </div>
  </>
)}


                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </div>
    );
};

export default Admin;