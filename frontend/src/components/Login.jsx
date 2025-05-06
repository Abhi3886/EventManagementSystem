import React, { useState, useRef, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import mitLogo from "../assets/MIT_logo.png";
import LoadingSpinner from "./LoadingSpinner";

const Login = ({ setIsForgotPasswordFlow }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });

  const navigate = useNavigate();
  const emailInputRef = useRef(null);

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  const handleManualLogin = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Password cannot be empty");
      return;
    }

    const loginData = { email, password };

    try {
      setIsLoading(true);
      console.log(loginData);

      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
        credentials: "include",
      });

      const result = await response.json();
      console.log("result loginka: ", result);

      setIsLoading(false);

      if (response.ok) {
        const role = result.user.role;
        if (role == "admin") {
          navigate("/admin");
        }
        if (role === "student") {
          navigate("/student");
        } else if (role === "faculty") {
          navigate("/faculty");
        } else if (role === "eventManager") {
          navigate("/eventManager");
        }
      } else {
        setError("Error during login. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setError("Error during login. Please try again.");
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setIsForgotPasswordFlow(true);
    navigate("/forgot-password");
  };

  const goSignup = () => {
    window.location.href = "/signup";
  };

  return (
    <div className="login-container">
      {isLoading && <LoadingSpinner />}

      <div className="login-card">
        <img src={mitLogo} alt="MIT Logo" className="mit-logo" />
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to your account</p>

        <form onSubmit={handleManualLogin} className="login-form">
          <div className="form-group">
            <input
              type="email"
              id="email"
              ref={emailInputRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocused({ ...isFocused, email: true })}
              onBlur={() => setIsFocused({ ...isFocused, email: false })}
              required
              className="input-field"
            />
            <label
              htmlFor="email"
              className={`input-label ${
                isFocused.email || email ? "active" : ""
              }`}
            >
              Email
            </label>
          </div>

          <div className="form-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsFocused({ ...isFocused, password: true })}
              onBlur={() => setIsFocused({ ...isFocused, password: false })}
              required
              className="input-field"
            />
            <label
              htmlFor="password"
              className={`input-label ${
                isFocused.password || password ? "active" : ""
              }`}
            >
              Password
            </label>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <p className="forgot-password-link">
          <a href="/forgot-password" onClick={handleForgotPassword}>
            Forgot your password?
          </a>
        </p>

        <p className="signup-link">
          Don't have an account?{" "}
          <a href="/signup" onClick={goSignup}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
