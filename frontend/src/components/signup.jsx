import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    additionalInfo: {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["prn", "course", "branch", "year", "facultyId", "department", "designation", "organizationName", "eventManagerId", "experience"].includes(name)) {
     
      setFormData((prevState) => ({
        ...prevState,
        additionalInfo: {
          ...prevState.additionalInfo,
          [name]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleNext = () => {
    if (formData.role) {
      setStep(2); 
    } else {
      alert("Please select a role before proceeding!");
    }
  };

  const handleBack = () => {
    setStep(1); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/addUser", formData);
      alert("User created successfully!");
    } catch (error) {
      console.error(error);
      alert("Error creating user");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {step === 1 && (
        <div className="step-one">
          <h3>Select Your Role</h3>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="eventManager">Event Manager</option>
          </select>
          <button className="btn-primary" onClick={handleNext}>
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {formData.role === "student" && (
            <div>
              <input
                type="text"
                name="prn"
                placeholder="PRN"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="course"
                placeholder="Course"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="branch"
                placeholder="Branch"
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="year"
                placeholder="Year"
                onChange={handleChange}
                required
              />
            </div>
          )}
          {formData.role === "faculty" && (
            <div>
              <input
                type="text"
                name="facultyId"
                placeholder="Faculty ID"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="department"
                placeholder="Department"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="designation"
                placeholder="Designation"
                onChange={handleChange}
                required
              />
            </div>
          )}
          {formData.role === "eventManager" && (
            <div>
              <input
                type="text"
                name="organizationName"
                placeholder="Organization Name"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="eventManagerId"
                placeholder="Event Manager ID"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="experience"
                placeholder="Experience"
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-buttons">
            <button type="button" className="btn-secondary" onClick={handleBack}>
              Back
            </button>
            <button type="submit" className="btn-primary">
              Sign Up
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Signup;