import React from "react";
import { ClipLoader, FadeLoader, PulseLoader, RingLoader } from "react-spinners"; // You can use any other spinner too
import './LoadingSpinner.css'

const LoadingSpinner = () => {
  return (
    <div className="loader-container">
     <PulseLoader />
    </div>
  );
};

export default LoadingSpinner;
