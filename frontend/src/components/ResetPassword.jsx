import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    setIsLoading(true);
    try {
      await axios.post("http://localhost:5000/send-otp", { email }, { withCredentials: true });
      setStep(2);
      setError("");
      setMessage("OTP sent to your email.");
    } catch (error) {
      setError("Error sending OTP.");
    }
    setIsLoading(false);
  };

  const verifyOtp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/verify-otp", { email, otp }, { withCredentials: true });
      setToken(response.data.token);
      setStep(3);
      setError("");
      setMessage("OTP verified. Set your new password.");
    } catch (error) {
      setError("Invalid OTP.");
    }
    setIsLoading(false);
  };

  const resetPassword = async () => {
    setIsLoading(true);
    try {
      await axios.post("http://localhost:5000/reset-password", { token, newPassword, confirmPassword }, { withCredentials: true });
      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setError("Error resetting password.");
    }
    setIsLoading(false);
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>

      {step === 1 && (
        <>
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={sendOtp} disabled={isLoading}>{isLoading ? "Sending OTP..." : "Send OTP"}</button>
        </>
      )}

      {step === 2 && (
        <>
          <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button onClick={verifyOtp} disabled={isLoading}>{isLoading ? "Verifying OTP..." : "Verify OTP"}</button>
        </>
      )}

      {step === 3 && (
        <>
          <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <button onClick={resetPassword} disabled={isLoading}>{isLoading ? "Updating..." : "Update Password"}</button>
        </>
      )}

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ResetPassword;