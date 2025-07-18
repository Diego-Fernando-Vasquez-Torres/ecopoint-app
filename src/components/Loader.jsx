import React from "react";
import "../styles/loader.css";

const Loader = ({ message = "Cargando..." }) => {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="loader-icon recycle-animation">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2v4l2-2 1.5 1.5L12 10 8.5 5.5 10 4l2 2V2zM3 13h4l-2 2 1.5 1.5L10 14l-4.5-4.5L4 11l2 2H3zm18 0h-4l2 2-1.5 1.5L14 14l4.5-4.5L20 11l-2 2h3zM12 22v-4l-2 2-1.5-1.5L12 14l3.5 4.5L14 20l-2-2v4z"
              fill="#22c55e"
            />
          </svg>
        </div>
        <p className="loader-text">{message}</p>
      </div>
    </div>
  );
};

export default Loader;
