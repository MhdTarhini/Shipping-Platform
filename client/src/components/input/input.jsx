import React, { useState } from "react";
import "./index.css";

function Input({ onchange, placeholder, name, type, value }) {
  return (
    <div className="flex column input-component ">
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onchange(e);
        }}
      />
    </div>
  );
}

export default Input;
