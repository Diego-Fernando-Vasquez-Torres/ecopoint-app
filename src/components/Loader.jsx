import React from "react";
import "../styles/loader.css";

const Loader = ({ message = "Cargando..." }) => {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="loader-icon">
          <svg className="spin" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none">
            <path
              fill="#22c55e"
              d="M12 2a1 1 0 0 1 1 1v1.05a7.002 7.002 0 0 1 5.917 5.917H20a1 1 0 1 1 0 2h-1.05a7.002 7.002 0 0 1-5.917 5.917V21a1 1 0 1 1-2 0v-1.05a7.002 7.002 0 0 1-5.917-5.917H4a1 1 0 1 1 0-2h1.05A7.002 7.002 0 0 1 10.967 4.05V3a1 1 0 0 1 1-1z"
            />
          </svg>
        </div>
        <p className="loader-text">{message}</p>
      </div>
    </div>
  );
};

export default Loader;
