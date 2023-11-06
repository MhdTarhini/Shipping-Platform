import React from "react";
import "./index.css";

function Button({ name, style, onClick }) {
  return (
    <button className="pushable" onClick={onClick}>
      <span className="shadow"></span>
      <span className="edge"></span>
      <span className="front">{name}</span>
    </button>
  );
}

export default Button;
