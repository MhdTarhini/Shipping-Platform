import React from "react";
import "./index.css";

function Button({ name, color, onClick }) {
  return (
    <button class="pushable" onClick={onClick}>
      <span class="shadow"></span>
      <span class="edge"></span>
      <span class={`front ${color}`}>{name}</span>
    </button>
  );
}

export default Button;
