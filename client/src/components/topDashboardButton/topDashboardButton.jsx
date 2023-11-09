import React from "react";
import "./index.css";

function TopDashboardButton({ text, onClick, buttonColor, buttonIcon }) {
  return (
    <div
      className={`add-shipment like-dislike-container ${buttonColor}`}
      onClick={() => {
        onClick();
      }}>
      <img src={buttonIcon} alt={text} />
      {text}
    </div>
  );
}

export default TopDashboardButton;
